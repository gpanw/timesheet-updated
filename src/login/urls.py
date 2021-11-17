from django.conf.urls import url
from . import views

urlpatterns = [
    #url(r'^$', views.loginpage, name='login'),
    url(r'^login/$', views.loginpage, name='login'),
    url(r'^logout/$', views.logoutpage, name='logout'),
]
