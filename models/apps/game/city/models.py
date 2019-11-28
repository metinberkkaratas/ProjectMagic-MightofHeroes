from django.db import models
from apps.game.location.models import Location
from apps.game.map.models import Map


class City(models.Model):
    name = models.CharField(max_length=20)
    location = models.OneToOneField(Location, on_delete=models.CASCADE)
    asset_type = models.IntegerField(default=0)
    map_in = models.ForeignKey(Map, on_delete=models.CASCADE)
