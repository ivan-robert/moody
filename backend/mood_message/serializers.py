from rest_framework import serializers

from mood_message.models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"


class MessageCreationSerializer(serializers.Serializer):
    body = serializers.CharField(max_length=255)
