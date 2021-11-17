import json
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError
)

from rest_framework import serializers
from django.contrib.auth.models import Group, User
from current.models import timesheet
from project.models import teams
from userprofile.models import userprofile


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserprofileSerializer(ModelSerializer):
    user_id = UserSerializer(required=True)
    date_joined = SerializerMethodField()
    class Meta:
        model = userprofile
        fields = '__all__'

    def get_date_joined(self, obj):
        date_joined = obj.user_id.date_joined.date().strftime('%Y-%m-%d')
        return date_joined 


class UserprofilePostImageSerializer(ModelSerializer):
    class Meta:
        model = userprofile
        fields = ['profile_photo']


class CompanyReportsSerializer(ModelSerializer):
    total = serializers.IntegerField()
    project = serializers.CharField()
    revenue_gen = SerializerMethodField()

    class Meta:
        model = timesheet
        fields = [
            'project',
            'total',
            'revenue_gen',
        ]

    def get_revenue_gen(self, obj):
        try:
            t = teams.objects.get(team_name=obj['project'])
            return t.revenue_gen
        except ObjectDoesNotExist:
            return False


class TeamReportsSerializer(ModelSerializer):
    total = serializers.IntegerField()
    col_name = serializers.CharField()

    class Meta:
        model = timesheet
        fields = [
            'col_name',
            'total',
        ]

