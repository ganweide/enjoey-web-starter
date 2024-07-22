from rest_framework import serializers
from .models import CoreServiceChildren, CoreServiceChildrenAllergies, CoreServiceChildrenMedicalContact, CoreServiceChildrenEnrollment, CoreServiceClassrooms, CoreServiceFamily, ChildrenTempTable

class ChildrenTempTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildrenTempTable
        fields = '__all__'

class CoreServiceChildrenTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceChildren
        fields = '__all__'

class CoreServiceChildrenAllergiesTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceChildrenAllergies
        fields = '__all__'

class CoreServiceChildrenMedicalContactTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceChildrenMedicalContact
        fields = '__all__'

class CoreServiceChildrenEnrollmentTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceChildrenEnrollment
        fields = '__all__'

class CoreServiceClassroomsTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceClassrooms
        fields = '__all__'

class CoreServiceFamilyTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceFamily
        fields = '__all__'

