from django.db import models


class SeaFight(models):
    battle_field = models.OneToOneField(Battlefield, on_delete=models.CASCADE)
