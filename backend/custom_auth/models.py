# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    related_name = "custom_user"
    USERNAME_FIELD = "user_id"
    username = models.CharField(max_length=150)
    user_id = models.CharField(max_length=150, unique=True, blank=True)
    last_login = models.DateTimeField(auto_now=True)

    def generate_unique_id(self):
        base_id = "@" + self.username
        unique_id = base_id
        counter = 1

        # Check if the generated user_id already exists
        while User.objects.filter(user_id=unique_id).exists():
            unique_id = f"{base_id}{counter}"
            counter += 1

        return unique_id

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = self.generate_unique_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
