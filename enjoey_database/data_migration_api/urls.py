from django.urls import path
from .views import UploadChildrenCSVData, MigrateIntoCoreServiceChildrenTable

urlpatterns = [
    path('childrencsvupload/', UploadChildrenCSVData.as_view(), name='file-upload'),
    path('children-migration/', MigrateIntoCoreServiceChildrenTable.as_view(), name='children-migration')
]

