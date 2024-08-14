from rest_framework import serializers
from .models import ChildTable, FamilyTable, AdmissionTable, ProgramTable, ActivityTable, MenuPlanningTable, SleepCheckTable, ImmunizationTable, SurveySettingsTable, PDFFiles, ActivityMediaTable, PaymentTable, ActivityTagsTable, ActivityAreaTagsTable, AppointmentTimeSlotsTable, AppointmentTable, BranchTable, EmailTemplateJsonTable, EmailTemplateHtmlTable, TempTable, CoreServiceChildren, CoreServiceChildrenAllergies, CoreServiceChildrenMedicalContact, CoreServiceFamily, DocumentsTable, TenantPaymentKeySettings, AttendanceTable, TenantPlan, TenantPlanFeatures, PublishSurveyTable, UserAnswerTable, TaxTable, EventCalendarTable
from auditlog.models import LogEntry

class EventCalendarTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCalendarTable
        fields = '__all__'

class LogEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEntry
        fields = ['id', 'action', 'timestamp', 'actor', 'changes', 'object_repr', 'remote_addr']

class TaxTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxTable
        fields = '__all__'

class PublishSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = PublishSurveyTable
        fields = '__all__'

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswerTable
        fields = '__all__'

class TenantPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantPlan
        fields = '__all__'

class TenantPlanFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantPlanFeatures
        fields = '__all__'

class AttendanceTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceTable
        fields = '__all__'

class TenantPaymentKeySettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantPaymentKeySettings
        fields = '__all__'

class DocumentsTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentsTable
        fields = '__all__'

class TempTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempTable
        fields = '__all__'

class CoreServiceChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceChildren
        fields = '__all__'

class CoreServiceChildrenAllergiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceChildrenAllergies
        fields = '__all__'

class CoreServiceChildrenMedicalContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceChildrenMedicalContact
        fields = '__all__'

class CoreServiceFamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreServiceFamily
        fields = '__all__'

class EmailTemplateHtmlTableSerializer(serializers.ModelSerializer):
    createdAt   = serializers.DateTimeField(required=False)
    class Meta:
        model = EmailTemplateHtmlTable
        fields = [
            'templateName',
            'htmlFormat',
            'createdAt',
        ]

class EmailTemplateJsonTableSerializer(serializers.ModelSerializer):
    createdAt   = serializers.DateTimeField(required=False)
    class Meta:
        model = EmailTemplateJsonTable
        fields = [
            'templateName',
            'jsonFormat',
            'createdAt',
        ]

class BranchTableSerializer(serializers.ModelSerializer):
    createdAt   = serializers.DateTimeField(required=False)
    branchId    = serializers.CharField(required=False)
    class Meta:
        model = BranchTable
        fields = [
            'branchId',
            'branchName',
            'branchLocation',
            'branchPrograms',
            'createdAt',
        ]

class AppointmentTableSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(required=False)
    appointmentId    = serializers.CharField(required=False)
    class Meta:
        model = AppointmentTable
        fields = [
            'id',
            'appointmentId',
            'name',
            'ageInterest',
            'branchId',
            'time',
            'date',
            'phone',
            'createdAt',
        ]

class AppointmentTimeSlotsTableSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(required=False)
    timeSlotsId    = serializers.CharField(required=False)
    class Meta:
        model = AppointmentTimeSlotsTable
        fields = [
            'timeSlotsId',
            'branchId',
            'ageInterest',
            'startTime',
            'endTime',
            'createdAt',
        ]

class ActivityTagsTableSerializer(serializers.ModelSerializer):
    tenantId = serializers.CharField(required=False)
    branchId = serializers.CharField(required=False)
    createdAt = serializers.DateTimeField(required=False)
    class Meta:
        model = ActivityTagsTable
        fields = [
            'tenantId',
            'branchId',
            'name',
            'isActive',
            'isArchived',
            'createdAt',
        ]

class ActivityAreaTagsTableSerializer(serializers.ModelSerializer):
    tenantId = serializers.CharField(required=False)
    branchId = serializers.CharField(required=False)
    createdAt = serializers.DateTimeField(required=False)
    class Meta:
        model = ActivityAreaTagsTable
        fields = [
            'tenantId',
            'branchId',
            'name',
            'isActive',
            'enterBy',
            'isArchived',
            'createdAt',
        ]

class ActivityMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityMediaTable
        fields = [
            'file',
            'hashtagValue',
        ]

class PDFFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFFiles
        fields = [
            'id',
            'file',
            'stored_at',
            'updated_at',
        ]

class PaymentTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTable
        fields = [
            'orderId',
            'paymentId',
            'signature',
        ]

class ChildTableSerializer(serializers.ModelSerializer):
    childId = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(required=False)
    class Meta:
        model = ChildTable
        fields = [
            'childId',
            'childNameENG',
            'childDOB',
            'childNRIC',
            'childSex',
            'childHeight',
            'childWeight',
            'languageSpoken',
            'created_at',
        ]

class FamilyTableSerializer(serializers.ModelSerializer):
    familyId = serializers.CharField(required=False)
    class Meta:
        model = FamilyTable
        fields = [
            'familyId',
            'name',
            'nRIC',
            'email',
            'occupation',
            'address',
            'relationship',
            'childId',
        ]

class AdmissionTableSerializer(serializers.ModelSerializer):
    admissionId = serializers.CharField(required=False)
    class Meta:
        model = AdmissionTable
        fields = [
            'admissionId',
            'title',
            'registrationDate',
            'status',
            'programId',
            'commencementDate',
            'childId',
        ]

class ProgramTableSerializer(serializers.ModelSerializer):
    programId = serializers.CharField(required=False)
    class Meta:
        model = ProgramTable
        fields = [
            'programId',
            'programName',
            'programDescription',
        ]

class ActivityTableSerializer(serializers.ModelSerializer):
    activityId = serializers.CharField(required=False)
    class Meta:
        model = ActivityTable
        fields = [
            'activityId',
            'activityType',
            'student',
            'date',
            'time',
            'foodType',
            'foodQuantity',
            'mealType',
            'mealItem',
            'note',
        ]

class MenuPlanningTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuPlanningTable
        fields = [
            'mealType',
            'date',
            'time',
            'description',
            'duplicate',
            'upUntil',
            'foodName',
            'foodCategory',
            'quantity',
            'unitOfMeasure',
            'classroom',
        ]

class SleepCheckTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepCheckTable
        fields = [
            'student',
            'date',
            'time',
            'activity',
            'observation',
            'position',
            'note',
        ]

class ImmunizationTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImmunizationTable
        fields = [
            'student',
            'date',
            'hepB',
            'dTap',
            'hib',
            'pcv',
            'polio',
            'rotavirus',
            'flu',
            'mmr',
            'var',
            'hepA',
        ]

class SurveySettingsTableSerializer(serializers.ModelSerializer):
    surveyId = serializers.CharField(required=False)
    class Meta:
        model = SurveySettingsTable
        fields = [
            'surveyId',
            'surveyTitle',
            'description',
            'questions',
        ]