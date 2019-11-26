from django.db import models

from PMMH.apps.game.city.models import City


class Building(models.Model):
    name = models.CharField(max_length=20)
    upgrades = models.OneToOneField('self', null=True, blank=True, related_name='next')
    city = models.ForeignKey(City, on_delete=models.CASCADE())
