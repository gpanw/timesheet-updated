import json
from rest_framework.validators import UniqueTogetherValidator
from datetime import date
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError
)

from leave.models import applyleave


class ApplyLeaveDetailSerializer(ModelSerializer):

    class Meta:
        model = applyleave
        fields = [
            'id',
            'leaveid',
            'date',
            'comment',
            'user',
        ]

class ApplyLeaveMonthDetailSerializer(ModelSerializer):
    day = SerializerMethodField()

    class Meta:
        model = applyleave
        fields = [
            'id',
            'leaveid',
            'date',
            'day',
            'comment',
            'user',
        ]

    def get_day(self, obj):
        day = obj.date.strftime('%d')
        return day


class ApplyLeaveCreateSerializer(ModelSerializer):

    class Meta:
        model = applyleave
        fields = [
            'id',
            'leaveid',
            'date',
            'comment',
            'user',
        ]
        validators = [
            UniqueTogetherValidator(
                queryset = applyleave.objects.all(),
                fields=('leaveid', 'date', 'user',),
                message='Leve has already been added for this user and date'
            )
        ]







