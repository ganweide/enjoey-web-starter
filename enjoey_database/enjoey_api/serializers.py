from rest_framework import serializers
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable

class ChildTableSerializer(serializers.ModelSerializer):
    childId = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(required=False)
    class Meta:
        model = ChildTable
        fields = ['childId', 'childNameENG', 'childDOB', 'childNRIC', 'languageSpoken', 'created_at']

class FamilyTableSerializer(serializers.ModelSerializer):
    familyId = serializers.CharField(required=False)
    class Meta:
        model = FamilyTable
        fields = ['familyId', 'name', 'nRIC', 'email', 'occupation', 'address', 'relationship', 'childId']

class AdmissionTableSerializer(serializers.ModelSerializer):
    admissionId = serializers.CharField(required=False)
    class Meta:
        model = AdmissionTable
        fields = ['admissionId', 'title', 'registrationDate', 'status', 'programId', 'commencementDate', 'childId']

class ProgramTableSerializer(serializers.ModelSerializer):
    programId = serializers.CharField(required=False)
    class Meta:
        model = ProgramTable
        fields = ['programId', 'programName', 'programDescription']