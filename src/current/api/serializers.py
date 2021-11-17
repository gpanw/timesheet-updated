import json
from rest_framework import serializers
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError
)

from current.models import timesheet
from userprofile.models import userprofile
from project.models import leave, task
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from utils.projectsutils import get_friday


class TimesheetDetailSerializer(ModelSerializer):
    hours = SerializerMethodField()

    class Meta:
        model = timesheet
        fields = [
            'date',
            'taskid',
            'is_billable',
            'hours',
            'sum_hours',
            'approved',
            'approved_by',
        ]

    def get_hours(self, obj):
        jsonDec = json.decoder.JSONDecoder()
        return jsonDec.decode(obj.hours)


class TimesheetCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = timesheet
        fields = [
            'user',
            'taskid',
            'is_billable',
            'date',
            'hours'
        ]

    def create(self, validated_data):
        try:
            obj = timesheet.objects.get(taskid=validated_data['taskid'],
                                        date=validated_data['date'],
                                        is_billable=validated_data['is_billable'],
                                        user=validated_data['user'])
        except ObjectDoesNotExist:
            obj = timesheet(taskid=validated_data['taskid'],
                            date=validated_data['date'],
                            hours=validated_data['hours'],
                            user=validated_data['user'],
                            is_billable=validated_data['is_billable'])
            super(TimesheetCreateUpdateSerializer, self).create(validated_data)
        else:
            obj.hours = validated_data['hours']
            self.update(obj, validated_data)
        return obj

    def validate(self, data):
        task_name = data['taskid']
        is_billable = data['is_billable']
        if is_billable == 'B':
            task_billable=True
        else:
            task_billable=False
        user = data['user']
        leave_list = [x.leave_id for x in leave.objects.all()]
        json_dec = json.decoder.JSONDecoder()
        hr = json_dec.decode(data['hours'])
        if task_name.split(' - ')[0] in leave_list:
            u = userprofile.objects.get(user_id__username=user)
            if task_name.split(' - ')[0] == 'EL':
                if sum([float(x) for x in hr]) > u.earned_leave:
                    raise ValidationError("You do not have enough Earned Leave!!!")
            if task_name.split(' - ')[0] == 'CL':
                if sum([float(x) for x in hr]) > u.casual_leave:
                    raise ValidationError("You do not have enough Casual Leaves!!!")
        else:
            try:
                get_task_id = task.objects.get(task_name=task_name,
                                               is_billable=task_billable)
            except ObjectDoesNotExist:
                raise ValidationError('task ' + task_name + ' is not correct!!!')
        return data

    def validate_date(self, date):
        if date >= get_friday(timezone.now()).date():
            pass
        else:
            raise ValidationError("Previous week!!Do a Prior Time adjustment")
        return date

    def validate_hours(self, hours):
        json_dec = json.decoder.JSONDecoder()
        hr = json_dec.decode(hours)
        for h in hr:
            try:
                float(h)
            except ValueError:
                raise ValidationError("Non-Integers values in hours!!!")
        return hours


class TimesheetUserReportSerializer(ModelSerializer):
    total = serializers.IntegerField()
    date__month = serializers.IntegerField()

    class Meta:
        model = timesheet
        fields = [
            'is_billable',
            'date__month',
            'total'
        ]


class TimesheetUserForecastReportSerializer(ModelSerializer):
    total = serializers.IntegerField()
    col_name = serializers.CharField()

    class Meta:
        model = timesheet
        fields = [
            'col_name',
            'is_billable',
            'total',
        ]
