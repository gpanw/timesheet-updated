from datetime import datetime
from utils.projectsutils import get_friday
from django.db.models import F
from project.models import teams
from django.db.models import Min, Count, Sum
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
)
from .serializers import (
    TimesheetDetailSerializer,
    TimesheetCreateUpdateSerializer,
    TimesheetUserReportSerializer,
    TimesheetUserForecastReportSerializer
)
from current.models import timesheet
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from .permissions import (
    IsOwnerOrReadOnly,
    IsTeamLead
)
from rest_framework.response import Response
import json


class TimesheetDetailApiView(ListAPIView):
    serializer_class = TimesheetDetailSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        input_date = self.kwargs['date']
        input_date = datetime.strptime(input_date, "%Y-%m-%d").date()
        input_date = get_friday(input_date)
        return timesheet.objects.filter(user=self.request.user,
                                        date=input_date)


class TimesheetCreateApiView(CreateAPIView):
    #queryset = timesheet.objects.all()
    serializer_class = TimesheetCreateUpdateSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def create(self, request, *args, **kwargs):
        tasks = request.data
        myData = dict()
        for t in tasks:
            myData['taskid'] = t['taskid']
            myDate = get_friday(datetime.strptime(kwargs['date'],'%Y-%m-%d')).date()
            myData['date'] = myDate
            myData['hours'] = json.dumps(t['hours'])
            myData['is_billable'] = t['is_billable']
            myData['user'] = self.request.user.username
            new_item = TimesheetCreateUpdateSerializer(data=myData)
            if new_item.is_valid():
                new_item.save()
            else:
                key = next(iter(new_item.errors))
                return Response({'rc': 'Error!!! ' + key})
        return Response({'rc': 'Timesheet submitted successfully for week ' + myDate.strftime('%Y-%m-%d')})

    def last_create(self, request, *args, **kwargs):
        tasks = json.loads(request.data['addedtask[]'])
        for t in tasks:
            t['date'] = kwargs['date']
            t['hours'] = json.dumps(t['hours'])
            t['user'] = self.request.user.username
            new_item = TimesheetCreateUpdateSerializer(data=t)
            if new_item.is_valid():
                new_item.save()
            else:
                key = next(iter(new_item.errors))
                return Response({'rc': new_item.errors[key][0]})
        return Response({'rc': 1})


class TimesheetUserReportView(ListAPIView):
    serializer_class = TimesheetUserReportSerializer
    permission_classes = [IsAuthenticated, IsTeamLead]

    def get_queryset(self):
        input_year = self.request.query_params.get('year')
        input_user = self.request.query_params.get('user')
        k = dict()
        k['date__year'] = input_year
        team_id = self.kwargs['project']
        if input_user.upper() == "ALL":
            team_name = teams.objects.get(slug=team_id).team_name
            k['user_project'] = team_name
        else:
            k['user'] = input_user
        query_result = timesheet.objects.filter(**k) \
            .values('date__month', 'is_billable').annotate(total=Sum('sum_hours')) \
            .order_by('date__month', 'is_billable')
        return query_result


class TimesheetUserForecastReportView(ListAPIView):
    serializer_class = TimesheetUserForecastReportSerializer
    permission_classes = [IsAuthenticated, IsTeamLead]

    def get_queryset(self):
        input_year = self.request.query_params.get('year')
        input_month = self.request.query_params.get('month')
        input_date = self.request.query_params.get('date')
        group_by = self.request.query_params.get('from')
        k = dict()
        k['date__year'] = input_year
        if input_month.upper() == 'ALL':
            pass
        else:
            k['date__month'] = input_month
        if input_date.upper() == 'ALL':
            pass
        else:
            k['date__day'] = input_date
        team_id = self.kwargs['project']
        k['user_project'] = teams.objects.get(slug=team_id).team_name
        query_result = timesheet.objects.annotate(col_name=F(group_by)).filter(**k) \
            .values('col_name', 'is_billable').annotate(total=Sum('sum_hours')) \
            .order_by('col_name', 'is_billable')
        return query_result

