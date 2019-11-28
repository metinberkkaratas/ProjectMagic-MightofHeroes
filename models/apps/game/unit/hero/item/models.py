from django.db import models
from apps.game.unit.hero.models import Hero


class Item(models.Model):
    name = models.CharField(max_length=30)
    armor = models.IntegerField()
    damage = models.IntegerField()
    item_of = models.ForeignKey(Hero, on_delete=models.CASCADE)
