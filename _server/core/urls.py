from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('character/<int:character_id>/', view=views.character_detail, name="character_detail"),
    path('character/create/', view=views.create_character, name="create_character")
]