from django.db import models


class UnitStat(models.Model):
    vitality = models.IntegerField()
    strength = models.IntegerField()
    agility = models.IntegerField()
    stamina = models.IntegerField()
    intelligence = models.IntegerField()
    armor = models.IntegerField()
    damage = models.IntegerField()
    available = models.IntegerField()