from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST 
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from .serializers import (
    UserLoginSerializer,
)
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
)
from rest_framework.permissions import (
    AllowAny,
)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            username, password = request.data['username'], request.data['password']
            user = authenticate(username=username, password=password)
            login(request, user)
            return Response(new_data, HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        if request.user.username:
            logout(request)
        return Response({}, HTTP_200_OK)


class UserLogoutView(APIView):
    #serializer_class = UserLogoutSerializer

    def get(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'user has been logged out'}, HTTP_200_OK)