from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('character/<int:campaign_id>/', view=views.character_detail, name="character_detail"),
    path('character/create/', view=views.create_character, name="create_character"),
    path('user/', view=views.get_user, name="get_user"),
    path('character/campaign/<int:campaign_id>/', view=views.get_character_for_campaign, name="get_character_for_campaign"),
    path('campaign/create/', view=views.create_campaign, name="create_campaign"),
    path('campaign/check/<int:campaign_id>/', view=views.check_campaign, name="check_campaign"),
    path('campaign/list/', view=views.campaign_list, name="campaign_list"),
    path('campaign/details/<int:campaign_id>/', view=views.campaign_detail, name="campaign_detail"),
    path('scenario/create/', view=views.create_scenario, name="create_scenario"),
    path('scenario/<int:scenario_id>/<int:campaign_id>/', view=views.scenario_detail, name="scenario_detail"),
    path('note/create/', view=views.create_note, name="create_notes"),
]