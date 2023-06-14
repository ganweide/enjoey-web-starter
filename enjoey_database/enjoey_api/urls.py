from django.urls import path, include
from .views import ChildView, FamilyView, AdmissionView, ProgramView
from rest_framework import routers

route1 = routers.DefaultRouter()
route1.register("", ChildView, basename='childview')

route2 = routers.DefaultRouter()
route2.register("", FamilyView, basename='familyview')

route3 = routers.DefaultRouter()
route3.register("", AdmissionView, basename='admissionview')

route4 = routers.DefaultRouter()
route4.register("", ProgramView, basename='programview')

urlpatterns = [
    path('child/', include(route1.urls)),
    path('family/', include(route2.urls)),
    path('admission/', include(route3.urls)),
    path('program/', include(route4.urls)),
]

