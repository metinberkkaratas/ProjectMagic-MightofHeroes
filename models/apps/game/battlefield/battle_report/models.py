from django.db import models
from apps.game.unit.hero.item.models import Item
import datetime


class BattleReport(models.Model):
    exp = models.IntegerField()
    item_drop = models.OneToOneField(Item, on_delete=models.CASCADE)
    winner = models.CharField(max_length=20)
    number_of_dead = models.IntegerField()
    number_of_killed = models.IntegerField()
    date = models.DateField("Date", default=datetime.date.today)
