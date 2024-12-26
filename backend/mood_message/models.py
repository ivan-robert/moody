from django.db import models
from django.utils import timezone

from custom_auth.models import User

# Create your models here.


class Message(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        "custom_auth.User",
        on_delete=models.CASCADE,
        to_field="user_id",
    )
    destination = models.ForeignKey(
        "custom_auth.User",
        on_delete=models.CASCADE,
        to_field="user_id",
        related_name="destination",
    )
    read_at = models.DateTimeField(null=True, blank=True)

    @classmethod
    def get_today_message(cls, user: User):
        today = timezone.now().date()
        return Message.objects.filter(
            user__user_id=user.user_id, created_at__date=today
        ).first()

    def __str__(self):
        return self.text
