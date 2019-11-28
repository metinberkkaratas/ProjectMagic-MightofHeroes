from django.db import models
from apps.game.location.models import Location
from apps.game.nation.models import Nation
from apps.game.unit.unit_stat.models import UnitStat


class Unit(models.Model):
    name = models.CharField(max_length=30)
    health = models.IntegerField()
    location = models.OneToOneField(Location, on_delete=models.CASCADE)
    nation = models.ForeignKey(Nation, on_delete=models.CASCADE)
    unit_stat = models.OneToOneField(UnitStat, on_delete=models.CASCADE, null=True)
