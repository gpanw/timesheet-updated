import json
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError
)

from project.models import (
    task,
    teams,
    leave
    )


class TaskDetailSerializer(ModelSerializer):
    class Meta:
        model = task
        fields = [
            'task_name',
            'is_billable',
            'task_group',
        ]


class TaskListSerializer(ModelSerializer):
    class Meta:
        model = task
        fields = [
            'task_name',
            'is_billable',
            'task_group',
        ]

class TeamListSerializer(ModelSerializer):
    class Meta:
        model = teams
        fields = [
            'team_name',
            'slug'
        ]

class LeaveListSerializer(ModelSerializer):
    class Meta:
        model = leave
        fields = [
            'leave_id',
            'leave_description',
        ]
