from django.urls import path
from .views import UploadChildrenCSVData

urlpatterns = [
    path('childrencsvupload/', UploadChildrenCSVData.as_view(), name='file-upload'),
]

