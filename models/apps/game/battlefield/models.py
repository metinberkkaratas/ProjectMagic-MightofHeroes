from django.db import models
from apps.game.map.models import Map
from apps.game.unit.models import Unit
from apps.game.battlefield.battle_report.models import BattleReport


class Battlefield(models.Model):
    BATTLE_TYPE = (
        ("SEA", "sea_fight"),
        ("GROUND", "ground_fight")
    )
    map = models.OneToOneField(Map, on_delete=models.CASCADE)
    units = models.ManyToManyField(Unit)
    battle_report = models.OneToOneField(BattleReport, on_delete=models.CASCADE)
    battle_type = models.CharField(max_length=10, choices=BATTLE_TYPE)
