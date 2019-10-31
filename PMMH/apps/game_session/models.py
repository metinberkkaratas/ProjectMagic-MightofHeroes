from django.db import models
from apps.user.models import User

# Create your models here.
class GameSession(models.Model):
    users = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    current_user = models.DecimalField(max_digits=10, decimal_places=10)

    def __str__(self):
        return "%s %s" % (self.status, self.current_user)

    def addUser(self, user):
        self.users.entry_set.add(user)