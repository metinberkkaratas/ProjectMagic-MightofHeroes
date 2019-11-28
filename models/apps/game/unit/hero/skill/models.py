from django.db import models
from apps.game.unit.hero.models import Hero


class Skill(models.Model):
    name = models.CharField(max_length=30)
    damage = models.IntegerField()
    effect = models.CharField(max_length=30)
    skill_of = models.ForeignKey(Hero, on_delete=models.CASCADE)
