from django.db import models

# Create your models here.
class Settings(models.Model):
    sfx = models.IntegerField(default=50)
    music = models.IntegerField(default=50)
