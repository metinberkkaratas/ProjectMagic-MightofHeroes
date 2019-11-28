from django.db import models
from apps.game.unit.models import Unit


class Hero(Unit):
    special = models.IntegerField(default=100)
    pop_cost = models.IntegerField()
