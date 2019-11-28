from django.db import models
from apps.game.location.models import Location


class Event(models.Model):
    name = models.CharField(max_length=100)
    effect_type = models.IntegerField(default=0)
    effect = models.IntegerField(default=0)
    location = models.OneToOneField(Location, on_delete=models.CASCADE)

def __str__(self):
    return self.name


def get_random():
    return Event.objects.order_by("?").first()
