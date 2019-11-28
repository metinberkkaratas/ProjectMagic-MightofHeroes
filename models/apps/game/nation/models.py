from django.db import models


class Nation(models.Model):
    name = models.CharField(max_length=20)
