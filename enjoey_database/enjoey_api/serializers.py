from rest_framework import serializers
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable

class ChildTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildTable
        fields = ['childNameENG', 'childDOB', 'childNRIC', 'languageSpoken']

class FamilyTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyTable
        fields = ['name', 'nRIC', 'email', 'occupation', 'address', 'relationship', 'childId']

class AdmissionTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdmissionTable
        fields = ['title', 'registrationDate', 'status', 'programId', 'commencementDate', 'childId']

class ProgramTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramTable
        fields = ['programName', 'programDescription']