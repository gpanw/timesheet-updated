from django.db.models import Min, Count, Sum
from django.db.models import F
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
)
from .serializers import (
    CompanyReportsSerializer,
    TeamReportsSerializer,
    UserprofileSerializer,
    UserprofilePostImageSerializer,
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from current.api.permissions import (
    IsOwnerOrReadOnly,
    IsTeamLead
)

from project.models import teams
from rest_framework.response import Response
from userprofile.models import userprofile
from django.http import HttpResponse, JsonResponse

class UserprofileView(ListAPIView):
    serializer_class = UserprofileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query_result = userprofile.objects.filter(user_id__username=self.request.user)
        return query_result


class UserprofilePostImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        values = userprofile.objects.all().filter(user_id__username=request.user)
        serializer = UserprofilePostImageSerializer(values, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserprofilePostImageSerializer(data=request.data, instance=request.user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        values = userprofile.objects.get(user_id__username=request.user)
        serializer = UserprofilePostImageSerializer(values, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class CompanyReportView(ListAPIView):
    serializer_class = CompanyReportsSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        query_result = userprofile.objects.values('project') \
            .annotate(total=Count('project')).order_by('-total')
        return query_result


class TeamReportView(ListAPIView):
    serializer_class = TeamReportsSerializer
    permission_classes = [IsAuthenticated, IsAdminUser, IsTeamLead]

    def get_queryset(self):
        team_id = self.kwargs['project']
        project = teams.objects.get(slug=team_id).team_name
        group_by = self.request.query_params.get('groupby')
        query_result = userprofile.objects.annotate(col_name=F(group_by)) \
            .values('col_name').filter(project=project) \
            .annotate(total=Count('col_name')).order_by(group_by)
        return query_result




