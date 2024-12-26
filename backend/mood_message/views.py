import random

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from custom_auth.models import User
from mood_message.models import Message
from mood_message.serializers import MessageCreationSerializer, MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    @action(detail=False, methods=["get"])
    def today(self, request: Request):
        user_id = request.headers.get("username")
        if user_id is None:
            return Response(
                {"error": "Username is required in the headers"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = User.objects.get(user_id=user_id)
        print("THE USER IS", user)
        today_message = Message.get_today_message(user)
        if today_message:
            serializer = self.serializer_class(today_message)
            return Response(serializer.data)
        else:
            return Response("no message", status=status.HTTP_404_NOT_FOUND)

    def _select_destination(self, request: Request):
        nb_users = User.objects.all().count()
        user_index = random.randint(0, nb_users - 1)
        user = User.objects.all()[user_index]
        return user

    def list(self, request: Request):
        messages = self.queryset
        serializer = self.serializer_class(messages, many=True)
        return Response(serializer.data)

    def create(self, request: Request):
        print("CREATING")
        serializer = MessageCreationSerializer(data=request.data)
        if serializer.is_valid():
            user_destination = self._select_destination(request)
            user_source = request.headers.get("username")
            if user_source is None:
                return Response(
                    {"error": "Username is required in the headers"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user_source = User.objects.get(user_id=user_source)
            Message.objects.create(
                text=serializer.validated_data["body"],
                user=user_source,
                destination=user_destination,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request: Request, pk=None):
        message = self.get_object()
        serializer = self.serializer_class(message)
        return Response(serializer.data)

    def update(self, request: Request, pk=None):
        message = self.get_object()
        serializer = self.serializer_class(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request: Request, pk=None):
        message = self.get_object()
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
