from django.db import models


class ChatMessage(models.Model):
    message = models.CharField(max_length=120)
    received_at = models.DateField(auto_now_add=True)
