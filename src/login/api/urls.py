from django.conf.urls import url

from .views import (
    UserLoginView,
    UserLogoutView,
)
app_name = 'timesheet'

urlpatterns = [
    url(r'^login/$',
        UserLoginView.as_view(),
        name='login'),
    url(r'^logout/$',
        UserLogoutView.as_view(),
        name='logout'),
]