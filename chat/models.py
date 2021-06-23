from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Chat(models.Model):
    text = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.text
