from django.conf.urls import url

from .views import (
    TeamReportView,
    CompanyReportView,
    UserprofileView,
    UserprofilePostImageView,
)
app_name = 'timesheet'

urlpatterns = [
    url(r'^companyreports/$', CompanyReportView.as_view(), name='reports'),
    url(r'^teamreports/(?P<project>[\w-]+)/$', TeamReportView.as_view(), name='reports'),
    url(r'^userprofile/$', UserprofileView.as_view(), name='reports'),
    url(r'^userprofile/post/image/$', UserprofilePostImageView.as_view(), name='userprofile'),
    #url(r'^userprofile/(?P<user>[\w-]+)/image/$', UserprofilePostImageView.as_view(), name='userprofile'),
]
