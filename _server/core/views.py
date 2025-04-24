from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Character, Campaign, Scenario, Notes
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist


# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def get_user(request):
    user = request.user
    return JsonResponse({
        'id': user.id,
        'username': user.username,
        'email': user.email,
    })

@login_required
def create_campaign(request):
    body = json.loads(request.body)
    campaign = Campaign(
        name=body["name"],
        description=body["description"],
        dm=request.user
    )
    campaign.save()
    return JsonResponse(model_to_dict(campaign), safe=False)

@login_required
def campaign_list(request):
    campaigns = Campaign.objects.all().values('id', 'name', 'description', 'dm__username')
    return JsonResponse(list(campaigns), safe=False)

@login_required
def campaign_detail(request, campaign_id):
    campaign = Campaign.objects.get(id=campaign_id)
    characters = Character.objects.filter(campaigns=campaign)
    scenarios = Scenario.objects.filter(campaign=campaign)
    notes = Notes.objects.filter(campaign=campaign)
    return render(request, 'campaign_detail.html', {
        'campaign': campaign,
        'characters': characters,
        'scenarios': scenarios,
        'notes': notes
    })

@login_required
def get_character_for_campaign(request, campaign_id):
    campaign = campaign = Campaign.objects.get(id=campaign_id)
    character = campaign.characters.filter(user=request.user).first()
    if character:
        # return character or serialize it
        return JsonResponse({"character": model_to_dict(character)})
    else:
        return JsonResponse({"error": "Character not found"}, status=404)


@login_required
def character_detail(req, campaign_id):
    try:
        campaign = Campaign.objects.get(id=campaign_id)
        character = Character.objects.get(user_id=req.user.id, campaign=campaign)
        character_data = model_to_dict(character)
        return JsonResponse(character_data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Character not found'}, status=404)
    
@login_required
def create_character(req):
    body = json.loads(req.body)
    
    try:
        campaign = Campaign.objects.get(id=body["campaignId"])
    except Campaign.DoesNotExist:
        return JsonResponse({"error": "Campaign not found"}, status=404)

    # Optional: ensure user doesn't already have a character in this campaign
    if Character.objects.filter(user=req.user, campaign=campaign).exists():
        return JsonResponse({"error": "Character already exists in this campaign"}, status=400)

    character = Character.objects.create(
        name=body["name"],
        class_type=body["class_type"],
        level=body["level"],
        race=body["race"],
        alignment=body["alignment"],
        ability_scores=body["ability_scores"],
        saving_throws=body["saving_throws"],
        combat_stats=body["combat_stats"],
        skills=body["skills"],
        equipment=body["equipment"],
        features_and_traits=body["features_and_traits"],
        backstory=body["backstory"],
        user=req.user,
        campaign=campaign,  # make sure your Character model has this FK
    )

    return JsonResponse(model_to_dict(character), safe=False)
