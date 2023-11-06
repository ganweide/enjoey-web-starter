# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.generics import CreateAPIView
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable, ActivityTable, MenuPlanningTable, SleepCheckTable, ImmunizationTable, SurveySettingsTable, PDFFiles
from .serializers import ChildTableSerializer, FamilyTableSerializer, AdmissionTableSerializer, ProgramTableSerializer, ActivityTableSerializer, MenuPlanningTableSerializer, SleepCheckTableSerializer, ImmunizationTableSerializer, SurveySettingsTableSerializer, PDFFilesSerializer
from rest_framework.response import Response
import datetime
from django.views import View
from django.conf import settings
import os
from io import BytesIO
from xhtml2pdf import pisa
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework.decorators import api_view
from django.core.management import call_command
from enjoey_api.management.commands.scheduler_manager import is_scheduler_running_job1



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
            'customer_name': 'Testing 1',
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

