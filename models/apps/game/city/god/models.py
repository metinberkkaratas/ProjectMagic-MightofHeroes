from django.db import models

from apps.game.city.models import City


class God(models.Model):
    name = models.CharField(max_length=20)
    effect = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
