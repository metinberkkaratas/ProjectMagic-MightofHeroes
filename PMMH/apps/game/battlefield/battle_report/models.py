from django.db import models
import datetime


class BattleReport(models.Model):
    exp = models.IntegerField()
    item_drop = models.OneToOneField(Item, on_delete=models.CASCADE)
    winner = models.CharField()
    number_of_dead = models.IntegerField()
    number_of_killed = models.IntegerField()
    date = models.DateField(_("Date"), default=datetime.date.today)


class Item(models.Model):
    name = models.CharField(max_length=30)
