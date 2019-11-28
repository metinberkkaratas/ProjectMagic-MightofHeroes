from django.db import models
from apps.game.map.models import Map
from apps.game.chat.models import ChatMessage
from apps.game.resources.models import Resources


class Game(models.Model):
    VICTORY_CHOICES = (
        ('SCORE', 'Score'),
        ('WONDER', 'Wonder'),
        ('DOMINATION', 'Domination')
    )
    num_of_turns = models.IntegerField(default=50)
    victory_condition = models.CharField(max_length=10, choices=VICTORY_CHOICES)
    status = models.BooleanField(default=False)
    map = models.ForeignKey(Map, on_delete=models.CASCADE)
    chat = models.ForeignKey(ChatMessage, on_delete=models.CASCADE)
    resource = models.OneToOneField(Resources, on_delete=models.CASCADE)
