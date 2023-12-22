# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.generics import CreateAPIView
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable, ActivityTable, MenuPlanningTable, SleepCheckTable, ImmunizationTable, SurveySettingsTable, PDFFiles, ActivityMediaTable, PaymentTable, ActivityAreaTagsTable, ActivityTagsTable, AppointmentTable, AppointmentTimeSlotsTable, BranchTable, EmailTemplateJsonTable, EmailTemplateHtmlTable
from .serializers import ChildTableSerializer, FamilyTableSerializer, AdmissionTableSerializer, ProgramTableSerializer, ActivityTableSerializer, MenuPlanningTableSerializer, SleepCheckTableSerializer, ImmunizationTableSerializer, SurveySettingsTableSerializer, PDFFilesSerializer, ActivityMediaSerializer, ActivityTagsTableSerializer, ActivityAreaTagsTableSerializer, AppointmentTableSerializer, AppointmentTimeSlotsTableSerializer, BranchTableSerializer, EmailTemplateJsonTableSerializer, EmailTemplateHtmlTableSerializer
from rest_framework.response import Response
import datetime
from django.views import View
from django.conf import settings
import os
from io import BytesIO
from xhtml2pdf import pisa
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from rest_framework.decorators import api_view
from django.core.management import call_command
from enjoey_api.management.commands.scheduler_manager import is_scheduler_running_job1
import boto3
from botocore.exceptions import NoCredentialsError
from django.http import JsonResponse
from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import razorpay
from django.shortcuts import render
from django.core.files.base import ContentFile
import requests
import json
from rest_framework.parsers import MultiPartParser, FormParser

class HtmlImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            try:
                image_sources = request.data.get('image', [])
                name = request.data.get('name', [])
                uploadedUrls = []
                for image_url in enumerate(image_sources):
                    response = requests.get(image_url)
                    if response.status_code == 200:
                        image_content = response.content

                        storage = S3Boto3Storage()
                        image_name = f"{name}.jpg"  # Modify as needed
                        image_path = f"{settings.IMG_LOCATION}/{image_name}"
                        storage.save(image_path, ContentFile(image_content))

                        url = storage.url(image_path)
                        uploadedUrls.append(url)
                        print(f'Image {name} uploaded. URL: {url}')
                    else:
                        print(f'Failed to download image {name} from URL: {image_url}')

                return JsonResponse({'success': True, 'uploadedUrls': uploadedUrls})
            except Exception as e:
                print('Error:', e)
                return JsonResponse({'error': str(e)}, status=500)
        return JsonResponse({'error': 'Invalid request method'}, status=400)

class EmailTemplateHtmlView(viewsets.ModelViewSet):
    queryset = EmailTemplateHtmlTable.objects.all().order_by('-createdAt')
    serializer_class = EmailTemplateHtmlTableSerializer
    #all
    def list(self, request):
        queryset = EmailTemplateHtmlTable.objects.all().order_by('createdAt')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = EmailTemplateHtmlTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = EmailTemplateHtmlTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = EmailTemplateHtmlTableSerializer(data=request.data)
        if serializer.is_valid():
            html_data=serializer.validated_data
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmailTemplateJsonView(viewsets.ModelViewSet):
    queryset = EmailTemplateJsonTable.objects.all().order_by('-createdAt')
    serializer_class = EmailTemplateJsonTableSerializer
    #all
    def list(self, request):
        queryset = EmailTemplateJsonTable.objects.all().order_by('createdAt')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = EmailTemplateJsonTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = EmailTemplateJsonTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = EmailTemplateJsonTableSerializer(data=request.data)
        if serializer.is_valid():
            json_data = serializer.validated_data
            self.traverse_and_process(json_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def traverse_and_process(self, data):
        print(data);
        if isinstance(data, dict):
            for key, value in data.items():
                if key == 'jsonFormat':
                    try:
                        json_data = json.loads(value)
                        self.traverse_and_process(json_data)
                    except json.JSONDecodeError:
                        print("Error decoding JSON in 'jsonFormat'")
                elif key == 'values' and isinstance(value, dict):
                    if 'src' in value and isinstance(value['src'], dict) and 'url' in value['src']:
                        print("Processing 'src' within 'values'")
                        new_url = self.process_and_upload_image(value['src']['url'])
                        value['src']['url'] = new_url
                    self.traverse_and_process(value)
                else:
                    self.traverse_and_process(value)
        elif isinstance(data, list):
            for item in data:
                self.traverse_and_process(item)

    def process_and_upload_image(self, old_url):
        print("process and upload image")
        try:
            storage = S3Boto3Storage()
            image_name = old_url.split('/')[-1]
            image_path = f"{settings.IMG_LOCATION}/{image_name}"

            response = requests.get(old_url)
            if response.status_code == 200:
                storage.save(image_path, ContentFile(response.content))
                new_url = storage.url(image_path)
                return new_url

            raise Exception(f"Failed to download image from {old_url}")
        except Exception as e:
            print('Error uploading image:', e)
            return old_url  # Return the original URL in case of an error

class AppointmentTimeSlotsView(viewsets.ModelViewSet):
    queryset = AppointmentTimeSlotsTable.objects.all().order_by('-createdAt')
    serializer_class = AppointmentTimeSlotsTableSerializer
    #all
    def list(self, request):
        queryset = AppointmentTimeSlotsTable.objects.all().order_by('-createdAt')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = AppointmentTimeSlotsTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = AppointmentTimeSlotsTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = AppointmentTimeSlotsTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentView(viewsets.ModelViewSet):
    queryset = AppointmentTable.objects.all().order_by('-createdAt')
    serializer_class = AppointmentTableSerializer
    #all
    def list(self, request):
        queryset = AppointmentTable.objects.all().order_by('-createdAt')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = AppointmentTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = AppointmentTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = AppointmentTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BranchView(viewsets.ModelViewSet):
    queryset = BranchTable.objects.all().order_by('-createdAt')
    serializer_class = BranchTableSerializer
    #all
    def list(self, request):
        queryset = BranchTable.objects.all().order_by('createdAt')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = BranchTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = BranchTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = BranchTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivityTagsView(viewsets.ModelViewSet):
    queryset = ActivityTagsTable.objects.all().order_by('-createdAt')
    serializer_class = ActivityTagsTableSerializer
    #all
    def list(self, request):
        queryset = ActivityTagsTable.objects.all().order_by('-createdAt')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ActivityTagsTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ActivityTagsTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ActivityTagsTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

client = razorpay.Client(auth=("rzp_test_3bw88hhzDiYA47", "UC5Q9p3aBA6UlQiPUG7maUHz"))
def initiate_payment(amount, currency='MYR'):
   data = {
       'amount': amount * 100,
       'currency': currency,
       'payment_capture': '1'
   }
   response = client.order.create(data=data)
   return response['id']

@api_view(['POST'])
def generate_order_id(request):
   amount = 100
   order_id = initiate_payment(amount)
   context = {
       'order_id': order_id,
       'amount': amount,
       'key': "rzp_test_3bw88hhzDiYA47"
   }
   return Response(context)

@api_view(['POST'])
def payment_success(request):
    if request.method == 'POST':
        try:
            PaymentTable.objects.create(
                orderId=request.data.get('orderId'),
                paymentId=request.data.get('paymentId'),
                signature=request.data.get('signature'),
            )
            print("request", request.data)
            return JsonResponse({'success': True})
        except Exception as e:
            print('Error:', e)
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            try:
                image = request.FILES.get('image')
                storage = S3Boto3Storage()
                image_name = image.name.replace(' ', '_')
                image_path = f"{settings.IMG_LOCATION}/{image_name}"
                storage.save(image_path, image)

                url = storage.url(image_path)

                ActivityMediaTable.objects.create(
                    file=image,
                    hashtagValue=request.data.get('hashtagValue', ['gardening', 'outdoor']),
                )

                return JsonResponse({'success': True, 'url': url})
            except Exception as e:
                print('Error:', e)
                return JsonResponse({'error': str(e)}, status=500)
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
    def get(self, request, *args, **kwargs):
        tag = request.GET.get('tag', '')  # Get the selected tag from the query parameters
        if tag:
            media_objects = ActivityMediaTable.objects.filter(hashtagValue__contains=[tag])
        else:
            media_objects = ActivityMediaTable.objects.all()

        serializer = ActivityMediaSerializer(media_objects, many=True)
        print(serializer.data)
        return Response(serializer.data)

@api_view(['POST'])
def start_scheduler(request, job_name):
    call_command("startscheduler", job_name)
    return Response({'message': 'Scheduler started'})

@api_view(['POST'])
def stop_scheduler(request, job_name):
    call_command("stopscheduler", job_name)
    return Response({'message': 'Scheduler stopped'})

@api_view(['GET'])
def check_scheduler_status(request):
    status = is_scheduler_running_job1()
    if status:
        return Response({'status': 'true'})
    else:
        return Response({'status': 'false'})

class PdfFileApiView(View):
    def get(self, request, *args, **kwargs):
        today = datetime.date.today().strftime("%Y-%m-%d")
        data = {
            'date': today,
            'amount': 100.00,
            'customer_name': 'Testing 2',
            'invoice_number': 1234567,
        }

        template = get_template('pdf/pdf.html')
        html = template.render(data)
        result = BytesIO()

        pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
        if not pdf.err:
            if not os.path.exists('pdfFiles/pdf/'):
                os.makedirs('pdfFiles/pdf/')
            pdf_path = os.path.join('pdfFiles/pdf/', 'testing.pdf')
            with open(pdf_path, 'wb') as pdf_file:
                pdf_file.write(result.getvalue())

            response = HttpResponse(result.getvalue(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="invoice.pdf"'
            return response

        return HttpResponse("Error generating PDF", content_type='text/plain')
    
class PDFUploadView(CreateAPIView):
    serializer_class = PDFFilesSerializer
    def create(self, request, *args, **kwargs):
        if not request.FILES.get('file', False):
            return Response({"msg":"file key is missing in body"}, \
                            status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES.getlist('file')[0]
        
        # perform checks
        file_ext = os.path.splitext( str(file.name) )[-1]
        if file_ext not in ['.pdf']:
            return Response({ \
                "msg":"file not valid" , "acceptable_extension" : \
                "[pdf]", }, \
                status=status.HTTP_400_BAD_REQUEST)
        
        PDFFiles.objects.filter(file=file).delete()

        upload = PDFFiles.objects.create(file=file)
        file_url = upload.file.url
        upload_id = upload.id
        return Response({"file_url" : file_url, "upload_id": upload_id}, \
                        status=status.HTTP_201_CREATED)

class PDFUploadViewWithDjangoStorages(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            try:
                file = request.FILES.get('file')

                storage = S3Boto3Storage()
                file_name = file.name
                file_path = f"{settings.PDF_LOCATION}/{file_name}"
                storage.save(file_path, file)
                
                url = storage.url(file_path)
                
                return JsonResponse({'success': True, 'url': url})
            except Exception as e:
                print('Error:', e)
                return JsonResponse({'error': str(e)}, status=500)
        return JsonResponse({'error': 'Invalid request method'}, status=400)

class PDFShowView(APIView):
    def get(self, request, file_key):
        try:
            storage = S3Boto3Storage()
            url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{file_key}"
            print("Constructed URL:", url)
            return JsonResponse({'url': url})
        except Exception as e:
            print("Error generating pre-signed URL:", str(e))
            return JsonResponse({'error': 'Error generating pre-signed URL.'}, status=500)

def get_presigned_url(request, file_key):
    try:
        s3_client = boto3.client(
            's3',
            region_name=settings.AWS_S3_REGION_NAME,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
        url = s3_client.generate_presigned_url('get_object', Params={'Bucket': 'weide1234', 'Key': file_key}, ExpiresIn=3600)
        print("Pre-signed URL:", url)
        return JsonResponse({'url': url})
    except NoCredentialsError:
        return JsonResponse({'error': 'AWS credentials are missing or invalid.'}, status=500)
    except Exception as e:
        print("Error generating pre-signed URL:", str(e))
        return JsonResponse({'error': 'Error generating pre-signed URL.'}, status=500)

class ChildView(viewsets.ModelViewSet):
    queryset = ChildTable.objects.all().order_by('-created_at')
    serializer_class = ChildTableSerializer
    #all
    def list(self, request):
        queryset = ChildTable.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ChildTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ChildTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ChildTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FamilyView(viewsets.ModelViewSet):
    queryset = FamilyTable.objects.all().order_by('-created_at')
    serializer_class = FamilyTableSerializer
    #all
    def list(self, request):
        queryset = FamilyTable.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = FamilyTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = FamilyTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = FamilyTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdmissionView(viewsets.ModelViewSet):
    queryset = AdmissionTable.objects.all().order_by('-created_at')
    serializer_class = AdmissionTableSerializer
    #all
    def list(self, request):
        queryset = AdmissionTable.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = AdmissionTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = AdmissionTableSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = AdmissionTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            user = AdmissionTable.objects.get(admissionId=pk)
        except AdmissionTable.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = AdmissionTableSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProgramView(viewsets.ModelViewSet):
    queryset = ProgramTable.objects.all().order_by('-created_at')
    serializer_class = ProgramTableSerializer
    #all
    def list(self, request):
        queryset = ProgramTable.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProgramTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProgramTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ProgramTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ActivityView(viewsets.ModelViewSet):
    queryset = ActivityTable.objects.all().order_by('-created_at')
    serializer_class = ActivityTableSerializer
    #all
    def list(self, request):
        queryset = ActivityTable.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ActivityTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ActivityTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ActivityTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MenuPlanningView(viewsets.ModelViewSet):
    queryset = MenuPlanningTable.objects.all().order_by('-created_at')
    serializer_class = MenuPlanningTableSerializer
    #all
    def list(self, request):
        queryset = MenuPlanningTable.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MenuPlanningTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MenuPlanningTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = MenuPlanningTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SleepCheckView(viewsets.ModelViewSet):
    queryset = SleepCheckTable.objects.all().order_by('-created_at')
    serializer_class = SleepCheckTableSerializer
    #all
    def list(self, request):
        queryset = SleepCheckTable.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = SleepCheckTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = SleepCheckTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = SleepCheckTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ImmunizationView(viewsets.ModelViewSet):
    queryset = ImmunizationTable.objects.all().order_by('-created_at')
    serializer_class = ImmunizationTableSerializer
    #all
    def list(self, request):
        queryset = ImmunizationTable.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ImmunizationTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ImmunizationTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ImmunizationTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SurveySettingsView(viewsets.ModelViewSet):
    queryset = SurveySettingsTable.objects.all().order_by('-created_at')
    serializer_class = SurveySettingsTableSerializer
    #all
    def list(self, request):
        queryset = SurveySettingsTable.objects.all().order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = SurveySettingsTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = SurveySettingsTableSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = SurveySettingsTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            user = SurveySettingsTable.objects.get(surveyId=pk)
        except SurveySettingsTable.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = SurveySettingsTableSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

