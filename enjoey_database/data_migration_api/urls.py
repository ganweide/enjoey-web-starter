from django.urls import path
from .views import UploadChildrenCSVData, MigrateIntoCoreServiceChildrenCoreServiceFamilyTable, MigrateIntoCoreServiceFamilyTable

urlpatterns = [
    path('childrencsvupload/', UploadChildrenCSVData.as_view(), name='file-upload'),
    path('children-family-migration/', MigrateIntoCoreServiceChildrenCoreServiceFamilyTable.as_view(), name='children-family-migration'),
    path('family-migration/', MigrateIntoCoreServiceFamilyTable.as_view(), name='family-migration')
]

