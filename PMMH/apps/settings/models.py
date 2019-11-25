from django.db import models

# Create your models here.
class Settings(models.Model):
    name_filter = models.CharField(max_length=30)
    sfx = models.DecimalField(max_digits=3)
    music = models.DecimalField(max_digits=3)

    def __str__(self):
        return self.username