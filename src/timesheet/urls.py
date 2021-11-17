"""timesheet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from login import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.urls import path
#from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.loginpage, name='home'),
    url(r'^contact', views.contactus, name='contactus'),
    url(r'^', include('login.urls')),
    url(r'^', include('current.urls')),
    url(r'^', include('priortime.urls')),
    url(r'^', include('leave.urls')),
    url(r'^', include('userprofile.urls')),
    #url(r'^', include('managerpage.urls')),
    #url(r'^', include('reports.urls')),
    #api URLs
    url('^', include('django.contrib.auth.urls')),
    url(r'^api/auth/', include("login.api.urls", namespace='login-api')),
    url(r'^api/timesheet/', include("current.api.urls", namespace='timesheet-api')),
    url(r'^api/project/', include("project.api.urls", namespace='task-api')),
    url(r'^api/priortime/', include("priortime.api.urls", namespace='priortime-api')),
    url(r'^api/leave/', include("leave.api.urls", namespace='leave-api')),
    url(r'^api/user/reports/', include("userprofile.api.urls", namespace='user-reports-api')),
    #login token
    #path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    #react url
    url(r'^react/', TemplateView.as_view(template_name='react/react.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
