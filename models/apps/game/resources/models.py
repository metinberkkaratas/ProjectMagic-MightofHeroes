from django.db import models


class Resources(models.Model):
    gold = models.IntegerField(default=0)
    pop_limit = models.IntegerField(default=0,)
    power_projection = models.IntegerField(default=0)
