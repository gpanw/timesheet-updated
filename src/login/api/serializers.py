import json
import jwt
from timesheet import settings
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
    CharField
)

from django.contrib.auth.models import Group, User

class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    username = CharField(required=True, allow_blank=False)
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
            'token'
        ]
        extra_kwargs = {"password":
                       {"write_only":True}
        }

    def validate(self, data):
        user_obj = None
        username = data.get("username", None)
        password = data.get("password")
        if not username:
            raise ValidationError("Username is required!")
        user = User.objects.filter(username=username)
        if user.exists():
            user_obj = user.first()
        else:
            raise ValidationError("Username doesn't exsist")
        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Password is not correct!")
        #data['token'] = 'token'
        data['token'] = jwt.encode({'usrename':username, 'password':password},settings.SECRET_KEY)

        return data
