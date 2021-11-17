from django.conf.urls import url

from .views import (
    TimesheetDetailApiView,
    TimesheetCreateApiView,
    TimesheetUserReportView,
    TimesheetUserForecastReportView
)
app_name = 'timesheet'

urlpatterns = [
    url(r'^(?P<date>[\w-]+)/$',
        TimesheetDetailApiView.as_view(),
        name='current'),
    url(r'^(?P<date>[\w-]+)/create/$',
        TimesheetCreateApiView.as_view(),
        name='create-timesheet'),
    url(r'^userreport/billable/(?P<project>[\w-]+)/$',
        TimesheetUserReportView.as_view(),
        name='user-report-timesheet'),
    url(r'^userreport/role/(?P<project>[\w-]+)/$',
        TimesheetUserForecastReportView.as_view(),
        name='user-report-timesheet'),
    url(r'^userreport/skill/(?P<project>[\w-]+)/$',
        TimesheetUserForecastReportView.as_view(),
        name='user-report-timesheet'),
]