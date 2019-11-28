from django.db import models
from apps.game.unit.models import Unit
from apps.game.location.models import Location


class Ship(Unit):
    second_loc = models.OneToOneField(Location, on_delete=models.CASCADE)
