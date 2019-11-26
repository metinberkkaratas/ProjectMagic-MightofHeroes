from django.db import models
from PMMH.apps.game.location.models import Location


class City(models.Model):
    name = models.CharField(max_length=20)
    location = models.OneToOneField(Location, on_delete=models.CASCADE())
    city_img = models.ImageField(upload_to='../../media')



