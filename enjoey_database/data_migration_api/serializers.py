from rest_framework import serializers
from .models import CoreServiceChildren, CoreServiceChildrenAllergies, CoreServiceChildrenMedicalContact, CoreServiceChildrenEnrollment, CoreServiceClassrooms, CoreServiceFamily, ChildrenTempTable, StaffTempTable, Classroom_staff, Programs, ClassRooms

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
        
class StaffTempTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffTempTable
        fields = '__all__'
        
class ProgramTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programs
        fields = '__all__'
        
class ClassroomTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRooms
        fields = '__all__'
        
class ClassroomStaffTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom_staff
        fields = '__all__'

