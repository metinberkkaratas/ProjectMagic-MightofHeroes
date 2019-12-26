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
    name = models.CharField(max_length=50, null=False, default='')
    num_of_turns = models.IntegerField(default=50)
    victory_condition = models.CharField(max_length=10, choices=VICTORY_CHOICES, default='SCORE')
    status = models.BooleanField(default=False)
    default_map = Map.objects.create()
    map = models.ForeignKey(Map, on_delete=models.CASCADE, default=default_map.id)
    default_chat = ChatMessage.objects.create()
    chat = models.ForeignKey(ChatMessage, on_delete=models.CASCADE, default=default_chat.id)
    default_resources = Resources.objects.create()
    resource = models.OneToOneField(Resources, on_delete=models.CASCADE, null=True, default=default_resources.id)
