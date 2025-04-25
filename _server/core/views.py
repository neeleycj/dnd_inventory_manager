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
def check_campaign(request, campaign_id):
    try:
        campaign = Campaign.objects.get(id=campaign_id)
        return JsonResponse({"id": campaign.id, "name": campaign.name, "description": campaign.description}, status=200)
    except Campaign.DoesNotExist:
        return JsonResponse({"error": "Campaign not found"}, status=404)
@login_required
def campaign_list(request):
    campaigns = Campaign.objects.get(players=request.user)
    if not campaigns:
        return JsonResponse({"error": "No campaigns found"}, status=404)
    campaigns = Campaign.objects.filter(players=request.user)
    campaigns = [
        {
            "id": campaign.id,
            "name": campaign.name,
            "description": campaign.description,
            "dm": campaign.dm.username,
            "players": [player.username for player in campaign.players.all()]
        }
        for campaign in campaigns
    ]
    return JsonResponse(list(campaigns), safe=False)

@login_required
def campaign_detail(request, campaign_id):
    try:
        campaign = Campaign.objects.get(id=campaign_id)
        characters = Character.objects.filter(campaign=campaign)
        scenarios = Scenario.objects.filter(campaign=campaign)
        notes = Notes.objects.filter(campaign=campaign)
        campaign_data = {
            "id": campaign.id,
            "name": campaign.name,
            "description": campaign.description,
            "dm": campaign.dm.username,
            "players": [player.username for player in campaign.players.all()],
            "characters": [model_to_dict(character) for character in characters],
            "scenarios": [model_to_dict(scenario) for scenario in scenarios],
            "notes": [model_to_dict(note) for note in notes]
        }
        return JsonResponse(campaign_data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Campaign not found'}, status=404)

@login_required
def create_scenario(request):
    body = json.loads(request.body)
    campaign_id = body["campaignId"]
    try:
        campaign = Campaign.objects.get(id=campaign_id)
    except Campaign.DoesNotExist:
        return JsonResponse({"error": "Campaign not found"}, status=404)

    scenario = Scenario(
        title=body["title"],
        description=body["description"],
        location=body["location"],
        npcs=body["npcs"],
        encounters=body["encounters"],
        loot=body["loot"],
        notes=body["notes"],
        campaign=campaign
    )
    scenario.save()
    return JsonResponse(model_to_dict(scenario), safe=False)

@login_required
def create_note(request):
    body = json.loads(request.body)
    campaign_id = body["campaignId"]
    try:
        campaign = Campaign.objects.get(id=campaign_id)
    except Campaign.DoesNotExist:
        return JsonResponse({"error": "Campaign not found"}, status=404)

    note = Notes(
        title=body["title"],
        content=body["content"],
        campaign=campaign
    )
    note.save()
    return JsonResponse(model_to_dict(note), safe=False)

@login_required
def scenario_detail(request, scenario_id, campaign_id):
    try:
        scenario = Scenario.objects.get(id=scenario_id, campaign_id=campaign_id)
        return JsonResponse(model_to_dict(scenario), safe=False)
    except Scenario.DoesNotExist:
        return JsonResponse({"error": "Scenario not found"}, status=404)


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
    campaign.players.add(req.user)

    return JsonResponse(model_to_dict(character), safe=False)

@login_required
def update_character(req, character_id):
    body = json.loads(req.body)
    try:
        character = Character.objects.get(id=character_id, user=req.user)
        for key, value in body.items():
            setattr(character, key, value)
        character.save()
        return JsonResponse(model_to_dict(character), safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Character not found'}, status=404)
    
    