from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import RegistrationSerializer, MyTokenObtainPairSerializer


class Registration(generics.CreateAPIView):
    """
    View managing user registration.
    """
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]


class MyTokenObtainPairView(TokenObtainPairView):
    """
    View managing JWT obtaining.
    """
    serializer_class = MyTokenObtainPairSerializer
