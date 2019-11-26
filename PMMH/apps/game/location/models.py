from django.db import models


class Location(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
