from rest_framework.permissions import BasePermission, SAFE_METHODS
from userprofile.models import userprofile
from project.models import teams
from django.contrib.auth.models import User, Group


class IsOwnerOrReadOnly(BasePermission):
    message = 'You are not owner of this thread'

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user.username


class IsTeamLeadOrUser(BasePermission):
    message = "You are not authorized to get this information"

    def has_permission(self, request, view):
        if view.kwargs['user'].upper() == "ALL":
            u = User.objects.get(username=request.user.username)
            return u.is_staff
        team_lead = userprofile.objects.get(user_id__username=view.kwargs['user']).manager_id
        return request.user.username == view.kwargs['user'] or team_lead == request.user.username


class IsTeamLead(BasePermission):
    message = "You are not authorized to get this information"

    def has_permission(self, request, view):
        if view.kwargs['project'].upper() == "ALL":
            u = User.objects.get(username=request.user.username)
            return u.is_staff
        team_lead = teams.objects.get(slug=view.kwargs['project']).team_lead
        return team_lead == request.user.username
