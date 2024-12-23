# Create your views here.
from uuid import uuid4

from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from custom_auth.models import User
from custom_auth.serializers import AuthenticateSerializer, CreateUserSerializer


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "is_staff"]


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def _generate_password(self):
        return uuid4().hex

    @action(detail=False, methods=["post"])
    def create_user(self, request: Request):
        serializer = CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data["username"]
        password = self._generate_password()
        user = User.objects.create_user(
            username=username,
            password=password,
        )
        user.save()
        unique_id = user.user_id
        return Response({"username": unique_id, "password": password}, status=201)

    @action(detail=False, methods=["post"])
    def login(self, request: Request):
        data = AuthenticateSerializer(request.data).data
        user = User.objects.get(user_id=data["username"])
        if not user.check_password(data["password"]):
            return Response(False, status=403)
        return Response(True, status=200)
