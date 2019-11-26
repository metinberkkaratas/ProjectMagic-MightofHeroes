from django.db import models


class Battlefield(models.Model):
    map = models.OneToOneField(Map, on_delete=models.CASCADE)
