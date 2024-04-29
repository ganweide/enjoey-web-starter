from django.urls import path, include, re_path
from .views import ChildView, FamilyView, AdmissionView, ProgramView, ActivityView, MenuPlanningView, SleepCheckView, ImmunizationView, SurveySettingsView, start_scheduler, stop_scheduler, check_scheduler_status, PdfFileApiView, PDFUploadView, get_presigned_url, PDFUploadViewWithDjangoStorages, PDFShowView, ImageUploadView, generate_order_id, payment_success, ActivityTagsView, AppointmentView, AppointmentTimeSlotsView, BranchView, EmailTemplateJsonView, EmailTemplateHtmlView, HtmlImageUploadView, PDFGenerationAndUploadView, CSVImportView, DocumentsView, TenantPaymentKeySettingsView, HandleImageUploadView, AttendanceView, TenantPlanView, TenantPlanFeaturesView, get_csrf_token, EmailTemplate, PublishSurveyView, UserAnswerView
from . import views
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

route10 = routers.DefaultRouter()
route10.register("", ActivityTagsView, basename='activitytagsview')

route11 = routers.DefaultRouter()
route11.register("", AppointmentView, basename='appointmentview')

route12 = routers.DefaultRouter()
route12.register("", AppointmentTimeSlotsView, basename='appointmenttimeslotsview')

route13 = routers.DefaultRouter()
route13.register("", BranchView, basename='branchview')

route14 = routers.DefaultRouter()
route14.register("", EmailTemplateJsonView, basename='emailtemplatejsonview')

route15 = routers.DefaultRouter()
route15.register("", EmailTemplateHtmlView, basename='emailtemplatehtmlview')

route16 = routers.DefaultRouter()
route16.register("", DocumentsView, basename='documentsview')

route17 = routers.DefaultRouter()
route17.register("", TenantPaymentKeySettingsView, basename='tenantpaymentkeysettingsview')

route18 = routers.DefaultRouter()
route18.register("", AttendanceView, basename='attendanceview')

route19 = routers.DefaultRouter()
route19.register("", TenantPlanView, basename='tenantplanview')

route20 = routers.DefaultRouter()
route20.register("", TenantPlanFeaturesView, basename='tenantplanfeaturesview')

route21 = routers.DefaultRouter()
route21.register("", EmailTemplate, basename='emailtemplate')

route22 = routers.DefaultRouter()
route22.register("", PublishSurveyView, basename='publishsurvey')

route23 = routers.DefaultRouter()
route23.register("", UserAnswerView, basename='useranswer')

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
    # path('generate-pdf/', PdfFileApiView.as_view(), name='generate_pdf'),
    path('generate-pdf/', PDFGenerationAndUploadView.as_view(), name='generate_pdf'),
    path('upload-pdf/', PDFUploadView.as_view(), name='upload_pdf'),
    path('upload/', PDFUploadViewWithDjangoStorages.as_view(), name='upload'),
    path('upload-image/', ImageUploadView.as_view(), name='upload_image'),
    re_path(r'^show/(?P<file_key>.*)/$', PDFShowView.as_view()),
    re_path(r'^get-presigned-url/(?P<file_key>.*)/$', get_presigned_url),
    path('order-id/', generate_order_id),
    path('payment-success/', payment_success, name='payment_success'),
    path('activitytags/', include(route10.urls)),
    path('appointment/', include(route11.urls)),
    path('appointment-time-slots/', include(route12.urls)),
    path('branch/', include(route13.urls)),
    path('email-editor-json/', include(route14.urls)),
    path('email-editor-html/', include(route15.urls)),
    path('html-upload-image/', HtmlImageUploadView.as_view(), name='html_upload_image'),
    path('csvupload/', CSVImportView.as_view(), name='file-upload'),
    path('documents/', include(route16.urls)),
    path('tenant-payment-key-settings/', include(route17.urls)),
    path('handle-image-upload/', HandleImageUploadView.as_view(), name='handle_image_upload'),
    path('attendance/', include(route18.urls)),
    path('tenant-plan/', include(route19.urls)),
    path('plan-features/', include(route20.urls)),
    path('send-email-template/', include(route21.urls)),
    path('get-csrf-token/', get_csrf_token),
    path('publish-survey/', include(route22.urls)),
    path('user-answer/', include(route23.urls)),
]

