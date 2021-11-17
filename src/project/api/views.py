from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
)
from .serializers import (
    TaskDetailSerializer,
    TeamListSerializer,
    LeaveListSerializer)
from project.models import (
    task,
    teams,
    leave)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)


class TaskDetailApiView(ListAPIView):
    queryset = task.objects.all()
    serializer_class = TaskDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'task_group'

    def get_queryset(self):
        try:
            task_group = self.kwargs['task_group']
        except:
            user = self.request.user
            task_group = user.userprofile.project
        return task.objects.filter(task_group=task_group)

class LeaveListApiView(ListAPIView):
    queryset = leave.objects.all()
    serializer_class = LeaveListSerializer
    permission_classes = [IsAuthenticated]

class TeamListApiView(ListAPIView):
    queryset = teams.objects.all()
    serializer_class = TeamListSerializer
    permission_classes = [IsAuthenticated]





