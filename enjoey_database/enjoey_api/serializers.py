from rest_framework import serializers
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable, ActivityTable, MenuPlanningTable

class ChildTableSerializer(serializers.ModelSerializer):
    childId = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(required=False)
    class Meta:
        model = ChildTable
        fields = ['childId', 'childNameENG', 'childDOB', 'childNRIC', 'childSex', 'childHeight', 'childWeight', 'languageSpoken', 'created_at']

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

class ActivityTableSerializer(serializers.ModelSerializer):
    activityId = serializers.CharField(required=False)
    class Meta:
        model = ActivityTable
        fields = ['activityId', 'activityType', 'student', 'date', 'time', 'foodType', 'foodQuantity', 'mealType', 'mealItem', 'note']

class MenuPlanningTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuPlanningTable
        fields = ['activityId', 'date', 'time', 'date', 'description', 'duplicate', 'upUntil', 'foodName', 'foodCategory', 'quantity', 'unitOfMeasure', 'classroom']