from django.db import models
from apps.game.models import Game
from apps.settings.models import Settings


class User(models.Model):
    NATION_CHOICES = (
        ('NAT1', 'Nation1'),
        ('NAT2', 'Nation2'),
        ('NAT3', 'Nation3')
    )
    game = models.ForeignKey(Game, on_delete=models.CASCADE, null=True)
    username = models.CharField(max_length=30, default='')
    nation = models.CharField(max_length=7, choices=NATION_CHOICES, null=True)
    status = models.BooleanField(default=False, null=True)
    settings = models.OneToOneField(Settings, on_delete=models.CASCADE)

    def __str__(self):
        return self.username
