from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings
class PDFStorage(S3Boto3Storage):
    location = settings.PDF_LOCATION
    file_overwrite = False

class ImageStorage(S3Boto3Storage):
    location = settings.IMG_LOCATION
    file_overwrite = True
