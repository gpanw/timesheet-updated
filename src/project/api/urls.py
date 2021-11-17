from django.conf.urls import url
from django.contrib import admin

from .views import ( 
	TaskDetailApiView,
	LeaveListApiView,
	TeamListApiView, )
app_name = 'timesheet'

urlpatterns = [
    url(r'^tasks/(?P<task_group>[\w-]+)/$', TaskDetailApiView.as_view(), name='task'),
    url(r'^tasks/$', TaskDetailApiView.as_view(), name='task'),
    url(r'^teams/$', TeamListApiView.as_view(), name='teams'),
    url(r'^leaves/$', LeaveListApiView.as_view(), name='leave'),
]