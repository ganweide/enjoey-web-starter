"""
URL configuration for enjoey_database project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from enjoey_api.views import ChildView
from django.urls import path, include
from rest_framework import routers

route1 = routers.DefaultRouter()
route1.register("", ChildView, basename='childview')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('enjoey_api.urls')),
    path('api/data_migration/', include('data_migration_api.urls')),
    path('test/', include(route1.urls)),
]
