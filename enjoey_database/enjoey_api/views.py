# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.generics import CreateAPIView

from .jobs import send_email_template
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable, ActivityTable, MenuPlanningTable, SleepCheckTable, ImmunizationTable, SurveySettingsTable, PDFFiles, ActivityMediaTable, PaymentTable, ActivityAreaTagsTable, ActivityTagsTable, AppointmentTable, AppointmentTimeSlotsTable, BranchTable, EmailTemplateJsonTable, EmailTemplateHtmlTable, TempTable, CoreServiceChildren, CoreServiceChildrenAllergies, CoreServiceChildrenMedicalContact, CoreServiceFamily, DocumentsTable, TenantPaymentKeySettings, AttendanceTable, TenantPlan, TenantPlanFeatures, PublishSurveyTable, UserAnswerTable
from .serializers import ChildTableSerializer, FamilyTableSerializer, AdmissionTableSerializer, ProgramTableSerializer, ActivityTableSerializer, MenuPlanningTableSerializer, SleepCheckTableSerializer, ImmunizationTableSerializer, SurveySettingsTableSerializer, PDFFilesSerializer, ActivityMediaSerializer, ActivityTagsTableSerializer, ActivityAreaTagsTableSerializer, AppointmentTableSerializer, AppointmentTimeSlotsTableSerializer, BranchTableSerializer, EmailTemplateJsonTableSerializer, EmailTemplateHtmlTableSerializer, TempTableSerializer, CoreServiceChildrenSerializer, CoreServiceChildrenAllergiesSerializer, CoreServiceChildrenMedicalContactSerializer, CoreServiceFamilySerializer, DocumentsTableSerializer, TenantPaymentKeySettingsSerializer, AttendanceTableSerializer, TenantPlanSerializer, TenantPlanFeaturesSerializer, PublishSurveySerializer, UserAnswerSerializer
from rest_framework.response import Response
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
from django.core.files.base import ContentFile
import requests
import json
from xhtml2pdf import pisa
import pdfkit
from django.template import Context, Template
from bs4 import BeautifulSoup, Comment
import csv
import datetime
from datetime import datetime

from django.middleware.csrf import get_token

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

class EmailTemplate(viewsets.ModelViewSet):
    def create(self, request):
        return send_email_template(request)

class TenantPlanView(viewsets.ModelViewSet):
    queryset = TenantPlan.objects.all().order_by('-createdAt')
    serializer_class = TenantPlanSerializer
    #all
    def list(self, request):
        queryset = TenantPlan.objects.all().order_by('id')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TenantPlanSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TenantPlanSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TenantPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TenantPlanFeaturesView(viewsets.ModelViewSet):
    queryset = TenantPlanFeatures.objects.all().order_by('-createdAt')
    serializer_class = TenantPlanFeaturesSerializer
    #all
    def list(self, request):
        queryset = TenantPlanFeatures.objects.all().order_by('id')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TenantPlanFeaturesSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TenantPlanFeaturesSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TenantPlanFeaturesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AttendanceView(viewsets.ModelViewSet):
    queryset = AttendanceTable.objects.all().order_by('-createdAt')
    serializer_class = AttendanceTableSerializer
    #all
    def list(self, request):
        queryset = AttendanceTable.objects.all().order_by('id')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = AttendanceTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = AttendanceTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = AttendanceTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HandleImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            try:
                uploaded_image = request.FILES['image']
                if not uploaded_image:
                    return JsonResponse({'error': 'Image file not found in the request.'}, status=400)
                storage = S3Boto3Storage()
                image_name = uploaded_image.name.replace(' ', '_')
                image_path = f"{settings.IMG_LOCATION}/{image_name}"
                storage.save(image_path, uploaded_image)

                s3_url = storage.url(image_path)

                return JsonResponse({'success': True, 'url': s3_url})
            except Exception as e:
                print('Error:', e)
                return JsonResponse({'error': str(e)}, status=500)
        return JsonResponse({'error': 'Invalid request method'}, status=400)

class TenantPaymentKeySettingsView(viewsets.ModelViewSet):
    queryset = TenantPaymentKeySettings.objects.all().order_by('-createdAt')
    serializer_class = TenantPaymentKeySettingsSerializer
    #all
    def list(self, request):
        queryset = TenantPaymentKeySettings.objects.all().order_by('id')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TenantPaymentKeySettingsSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TenantPaymentKeySettingsSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TenantPaymentKeySettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            document_instance = TenantPaymentKeySettings.objects.get(id=pk)
        except TenantPaymentKeySettings.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TenantPaymentKeySettingsSerializer(document_instance, data=request.data, partial=True)
        if serializer.is_valid():
            # Check if 'documentURL' exists in request.FILES
            if 'documentURL' in request.FILES:
                document_instance.documentURL = request.FILES['documentURL']

            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DocumentsView(viewsets.ModelViewSet):
    queryset = DocumentsTable.objects.all().order_by('-createdAt')
    serializer_class = DocumentsTableSerializer
    #all
    def list(self, request):
        queryset = DocumentsTable.objects.all().order_by('id')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = DocumentsTableSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = DocumentsTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = DocumentsTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            document_instance = DocumentsTable.objects.get(id=pk)
        except DocumentsTable.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = DocumentsTableSerializer(document_instance, data=request.data, partial=True)
        if serializer.is_valid():
            # Check if 'documentURL' exists in request.FILES
            if 'documentURL' in request.FILES:
                document_instance.documentURL = request.FILES['documentURL']

            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CSVImportView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        try:
            csv_data = csv.DictReader(file.read().decode('utf-8-sig').splitlines())
            total_uploaded = 0
            total_ignored = 0

            def convert_bool(value):
                if value.lower() == 'true':
                    return True
                elif value.lower() == 'false':
                    return False
                else:
                    return value
            
            def format_date(date_str):
                formats_to_try = ["%d-%m-%Y", "%Y-%m-%d", "%d/%m/%Y", "%Y-%m-%d"]
                
                for date_format in formats_to_try:
                    try:
                        date_obj = datetime.strptime(date_str, date_format)
                        return date_obj.strftime("%d-%m-%Y")
                    except ValueError:
                        continue
                
                # Handle invalid date formats here
                return None
            
            def format_phone_number(phone_number):
                return f"{phone_number[:3]}-{phone_number[3:]}"

            def format_birth_ic(birth_ic):
                return f"{birth_ic[:6]}-{birth_ic[6:8]}-{birth_ic[8:]}"
            
            def format_currency(currency):
                try:
                    currency_value = float(currency)
                    formatted_currency = "{:.2f}".format(currency_value)
                    return formatted_currency
                except ValueError:
                    return None
                
            def insert_temp_table(row):
                # Remove BOM if present in column names
                row = {key.lstrip('\ufeff'): value for key, value in row.items()}
                row['birthIC'] = format_birth_ic(row.get('birthIC', ''))
                row['birthICFamily'] = format_birth_ic(row.get('birthICFamily', ''))
                row['phoneMC'] = format_phone_number(row.get('phoneMC', ''))
                row['phoneFamily'] = format_phone_number(row.get('phoneFamily', ''))
                row['birthDate'] = format_date(row.get('birthDate', ''))
                row['isAllowPickup'] = convert_bool(row.get('isAllowPickup', ''))
                row['haveMedicine'] = convert_bool(row.get('haveMedicine', ''))
                serializer = TempTableSerializer(data=row)
                if serializer.is_valid():
                    serializer.save()
                    return serializer.data
                else:
                    raise Exception(serializer.errors)
                
            # def is_duplicate_data(self, row):
            #     # Check for duplication based on specified criteria
            #     existing_data = CoreServiceChildren.objects.filter(
            #         branchId=row.get('branchId'),
            #         fullName=row.get('fullName'),
            #         birthIC=row['birthIC']
            #     )

            #     # Additionally, check for duplicate based on family relationship
            #     existing_family_data = CoreServiceFamily.objects.filter(
            #         relationshipFamily=row.get('relationshipFamily'),
            #         birthICFamily=row.get('birthICFamily')
            #     )

            #     return existing_data.exists() or existing_family_data.exists()

            def populate_other_tables(row):
                existing_child = CoreServiceChildren.objects.filter(
                    branchId=row.get('branchId'),
                    fullName=row.get('fullName'),
                    birthIC=row.get('birthIC')
                ).first()

                if existing_child:
                    # Check if the child's existing family entry has the same relationship
                    existing_family = CoreServiceFamily.objects.filter(
                        birthICFamily=row.get('birthICFamily'),
                        relationshipFamily=row.get('relationshipFamily')
                    ).first()

                    if existing_family:
                        # If the family with the same relationship exists, ignore
                        nonlocal total_ignored
                        total_ignored += 1
                        return False
                    else:
                        # Save new family entry
                        family_serializer = CoreServiceFamilySerializer(data=row)
                        if family_serializer.is_valid():
                            family_instance = family_serializer.save()
                        else:
                            raise Exception(family_serializer.errors)
                else:
                    # Save new child entry
                    children_serializer = CoreServiceChildrenSerializer(data=row)
                    if children_serializer.is_valid():
                        child_instance = children_serializer.save()
                    else:
                        raise Exception(children_serializer.errors)

                    # Save new family entry
                    family_serializer = CoreServiceFamilySerializer(data=row)
                    if family_serializer.is_valid():
                        family_instance = family_serializer.save()
                    else:
                        raise Exception(family_serializer.errors)

                # Save medical contact and allergies
                medical_contact_serializer = CoreServiceChildrenMedicalContactSerializer(data=row)
                allergies_serializer = CoreServiceChildrenAllergiesSerializer(data=row)

                if all([serializer.is_valid() for serializer in [medical_contact_serializer, allergies_serializer]]):
                    medical_contact_serializer.save()
                    allergies_serializer.save()
                else:
                    raise Exception([serializer.errors for serializer in [medical_contact_serializer, allergies_serializer]])

                return True
                # if not is_duplicate_data(self, row):
                #     children_serializer = CoreServiceChildrenSerializer(data=row)
                #     medical_contact_serializer = CoreServiceChildrenMedicalContactSerializer(data=row)
                #     family_serializer = CoreServiceFamilySerializer(data=row)
                #     allergies_serializer = CoreServiceChildrenAllergiesSerializer(data=row)

                #     if all([serializer.is_valid() for serializer in [children_serializer, medical_contact_serializer, family_serializer, allergies_serializer]]):
                #         children_serializer.save()
                #         medical_contact_serializer.save()
                #         family_serializer.save()
                #         allergies_serializer.save()
                #     else:
                #         raise Exception([serializer.errors for serializer in [children_serializer, medical_contact_serializer, family_serializer, allergies_serializer]])
                    
                # else:
                #     nonlocal total_ignored
                #     total_ignored += 1
                #     return False

            temp_table_instances = [insert_temp_table(row) for row in csv_data]

            for temp_table_instance in temp_table_instances:
                if temp_table_instance:
                    if populate_other_tables(temp_table_instance):
                        total_uploaded += 1

            TempTable.objects.all().delete()

            return Response({'message': 'CSV data imported successfully', 'uploaded' : total_uploaded, 'ignored' : total_ignored}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class HtmlImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            try:
                image_sources = request.data.get('image', [])
                name = request.data.get('name', [])
                uploadedUrls = []
                for index, image_url in enumerate(image_sources):
                    response = requests.get(image_url)
                    if response.status_code == 200:
                        image_content = response.content

                        storage = S3Boto3Storage()
                        image_name = f"{name}_{index}.jpg"  # Modify as needed
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
    
    def update(self, request, pk=None):
        try:
            user = AppointmentTable.objects.get(id=pk)
        except AppointmentTable.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = AppointmentTableSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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

class PDFGenerationAndUploadView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            today = datetime.date.today().strftime("%Y-%m-%d")
            data = {
                'receipt_date': today,
                'birth_certificate': '003928-93-2674',
                'class': 'Banana Class',
                'amount': '1,000.00',
                'student_name': 'Testing 43434',
                'receipt_no': '1234567',
                'student_name': 'John Doe',
                'fee_description': 'First payment',
                'subtotal': '1,000.00',
                'gst': '60.00',
                'total': '1,060.00',
                'bank_no': '7364 3781 3746',
            }

            template_instance = EmailTemplateHtmlTable.objects.get(pk=76)
            serializer = EmailTemplateHtmlTableSerializer(template_instance)
            html_code = serializer.data.get('htmlFormat', '')

             # Parse HTML content using BeautifulSoup
            soup = BeautifulSoup(html_code, 'html.parser')

            # Remove comments from the HTML
            comments = soup.find_all(text=lambda text: isinstance(text, Comment))
            for comment in comments:
                comment.extract()

            # Remove media query styles
            for style_tag in soup.find_all('style'):
                style_text = str(style_tag.string)
                if '@media' in style_text:
                    style_tag.extract()

            for u_row_div in soup.find_all('div', class_='u-row'):
                u_row_div['style'] = str(u_row_div.get('style', '')) + 'max-width: 100%;'

            for img_tag in soup.find_all('img', src='https://cdn.tools.unlayer.com/image/placeholder.png'):
                table_tag = img_tag.find_parent('table')
                if table_tag:
                    # Find the parent of the parent table and remove it as well
                    parent_table_tag = table_tag.find_parent('table')
                    if parent_table_tag:
                        parent_table_tag.extract()

            # Find and replace <div> and <p> tags
            div_style = "font-size: 14px; line-height: 140%; text-align: right; word-wrap: break-word;"
            for div_tag in soup.find_all('div', style=div_style):
                # Extract the text from each <p> and create a new <div> for each line
                lines = [line.strip() for line in div_tag.stripped_strings]
                new_div = soup.new_tag('div')
                for line in lines:
                    new_line_div = soup.new_tag('div', style="text-align: right")
                    new_line_div.string = line
                    new_div.append(new_line_div)
                    new_div.append(soup.new_tag('br'))

                # Replace the original div with the new div
                div_tag.replace_with(new_div)

            # Get the cleaned HTML code
            cleaned_html = str(soup)

            template = Template(cleaned_html)
            html = template.render(Context(data))

            file_path = os.path.join('enjoey_api', 'templates', 'pdf', 'template.html')
            with open(file_path, 'w') as file:
                file.write(html)

            pdf_output_path = os.path.join('pdf', 'template.pdf')
            config = pdfkit.configuration(wkhtmltopdf='C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe')
            pdfkit.from_string(html, pdf_output_path, configuration=config)

            s3 = S3Boto3Storage()
            storage_path = f"{settings.PDF_LOCATION}/testTemplate.pdf"
            s3.save(storage_path, open(pdf_output_path, 'rb'))

            return JsonResponse({'success': 'PDF generated and uploaded to S3'}, status=200)

        except Exception as e:
            print('Error:', e)

        return JsonResponse({'error': 'Error generating and uploading PDF'}, status=500)

class PdfFileApiView(View):
    def get(self, request, *args, **kwargs):
        today = datetime.date.today().strftime("%Y-%m-%d")
        data = {
            'date': today,
            'amount': 100.00,
            'customer_name': 'Testing 2',
            'invoice_number': 1234567,
        }

        template = get_template('pdf/temp.html')
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
    
class PublishSurveyView(viewsets.ModelViewSet):
    queryset = PublishSurveyTable.objects.all().order_by('-createdAt')
    serializer_class = PublishSurveySerializer
    #all
    def list(self, request):
        queryset = PublishSurveyTable.objects.all().order_by('id')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PublishSurveySerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = PublishSurveySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = PublishSurveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserAnswerView(viewsets.ModelViewSet):
    queryset = UserAnswerTable.objects.all().order_by('-createdAt')
    serializer_class = UserAnswerSerializer
    #all
    def list(self, request):
        queryset = UserAnswerTable.objects.all().order_by('id')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = UserAnswerSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = UserAnswerSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = UserAnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

