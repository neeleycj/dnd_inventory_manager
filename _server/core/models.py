from django.db import models
from django.contrib.auth.models import User

class Character(models.Model):
    name = models.CharField(max_length=100)
    class_type = models.CharField(max_length=25)
    level = models.IntegerField(default=1)
    race = models.CharField(max_length=25)
    alignment = models.CharField(max_length=25)
    experience = models.IntegerField(default=0)
    ability_scores = models.JSONField(default=dict)
    saving_throws = models.JSONField(default=dict)
    combat_stats = models.JSONField(default=dict)
    skills = models.JSONField(default=dict)
    equipment = models.JSONField(default=dict)
    spells = models.JSONField(default=dict)
    features_and_traits = models.JSONField(default=dict)
    backstory = models.TextField()
    campaign = models.ForeignKey('Campaign', on_delete=models.CASCADE, related_name='characters', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='characters')


class Campaign(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    dm = models.ForeignKey(User, on_delete=models.CASCADE, related_name='campaigns')
    players = models.ManyToManyField(User, related_name='campaigns_joined')
    scenario = models.ManyToManyField('Scenario', related_name='campaigns')
    notes = models.ManyToManyField('Notes', related_name='campaign_notes')

class Scenario(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='scenarios')
    location = models.CharField(max_length=100)
    npcs = models.JSONField(default=dict)
    encounters = models.JSONField(default=dict)
    loot = models.JSONField(default=dict)
    notes = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

class Notes(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='note_campaigns')
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
