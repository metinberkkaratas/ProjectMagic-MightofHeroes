from django.db import models
from apps.game.map.models import Map


class Hexagon(models.Model):
    hex_type = models.IntegerField(default=0)
    background = models.BinaryField(blank=True)
    passable = models.BooleanField(default=False)
    row_of = models.ForeignKey(Map, on_delete=models.CASCADE)
