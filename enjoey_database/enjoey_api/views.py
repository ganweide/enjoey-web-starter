from django.shortcuts import render
from rest_framework import viewsets, status
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable
from .serializers import ChildTableSerializer, FamilyTableSerializer, AdmissionTableSerializer, ProgramTableSerializer
from rest_framework.response import Response

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
    
class ProgramView(viewsets.ModelViewSet):
    queryset = ProgramTable.objects.all().order_by('-created_at')
    serializer_class = ProgramTableSerializer
    #all
    def list(self, request):
        queryset = ProgramTable.objects.all().order_by('-created_at')
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


# Create your views here.
