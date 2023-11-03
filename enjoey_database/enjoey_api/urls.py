from django.urls import path, include
from .views import ChildView, FamilyView, AdmissionView, ProgramView, ActivityView, MenuPlanningView, SleepCheckView, ImmunizationView, SurveySettingsView, start_scheduler, stop_scheduler, check_scheduler_status, PdfFileApiView, PDFUploadView
from rest_framework import routers

route1 = routers.DefaultRouter()
route1.register("", ChildView, basename='childview')

route2 = routers.DefaultRouter()
route2.register("", FamilyView, basename='familyview')

route3 = routers.DefaultRouter()
route3.register("", AdmissionView, basename='admissionview')

route4 = routers.DefaultRouter()
route4.register("", ProgramView, basename='programview')

route5 = routers.DefaultRouter()
route5.register("", ActivityView, basename='activityview')

route6 = routers.DefaultRouter()
route6.register("", MenuPlanningView, basename='menuplanningview')

route7 = routers.DefaultRouter()
route7.register("", SleepCheckView, basename='sleepcheckview')

route8 = routers.DefaultRouter()
route8.register("", ImmunizationView, basename='immunizationview')

route9 = routers.DefaultRouter()
route9.register("", SurveySettingsView, basename='surveysettingsview')

urlpatterns = [
    path('child/', include(route1.urls)),
    path('family/', include(route2.urls)),
    path('admission/', include(route3.urls)),
    path('program/', include(route4.urls)),
    path('activity/', include(route5.urls)),
    path('menu/', include(route6.urls)),
    path('sleep/', include(route7.urls)),
    path('immunization/', include(route8.urls)),
    path('surveysettings/', include(route9.urls)),
    path('start-scheduler/<str:job_name>/', start_scheduler),
    path('stop-scheduler/<str:job_name>/', stop_scheduler),
    path('check-status/', check_scheduler_status, name='check_status'),
    path('generate-pdf/', PdfFileApiView.as_view(), name='generate_pdf'),
    path('upload-pdf/', PDFUploadView.as_view(), name='upload_pdf'),
]

