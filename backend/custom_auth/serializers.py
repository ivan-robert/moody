from rest_framework import serializers


class AuthenticateSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = ["username", "password"]