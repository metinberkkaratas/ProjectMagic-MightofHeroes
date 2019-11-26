from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=100)


def __str__(self):
    return self.name


def get_random():
    return Event.objects.order_by("?").first()
