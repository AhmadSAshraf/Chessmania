from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegistrationSerializer(serializers.ModelSerializer):
    """
    Controls new user creation with password check.
    """
    password = serializers.CharField(required=True,
                                     write_only=True,
                                     validators=[validate_password])

    password2 = serializers.CharField(required=True,
                                      write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def save(self, **kwargs):
        new_user = User(
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'Password': 'Passwords are not matching.'}
            )

        new_user.set_password(password)
        new_user.save()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer adding "username" field to both JWT.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token
