import time
from rest_framework import status
from .models import ChildrenTempTable, CoreServiceChildren, CoreServiceFamily, CoreServiceChildrenMedicalContact, CoreServiceChildrenAllergies, CoreServiceClassrooms, CoreServiceChildrenEnrollment
from .serializers import ChildrenTempTableSerializer, CoreServiceChildrenTableSerializer, CoreServiceChildrenMedicalContactTableSerializer, CoreServiceChildrenAllergiesTableSerializer, CoreServiceChildrenEnrollmentTableSerializer, CoreServiceFamilyTableSerializer, CoreServiceClassroomsTableSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import csv
import datetime
from datetime import datetime
from django.db.models import Max
from django.core.cache import cache

class UploadChildrenCSVData(APIView):
    def get(self, request, *args, **kwargs):
        try:
            records = ChildrenTempTable.objects.all()
            serializer = ChildrenTempTableSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        try:
            raw_data = file.read().decode('utf-8-sig')
            raw_lines = raw_data.splitlines()
            data_lines = raw_lines[4:]

            csv_data = csv.DictReader(data_lines)

            def convert_bool(value):
                if value == 'Yes':
                    return True
                elif value == 'No':
                    return False
                else:
                    return False
            
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
            
            csv_to_model_mapping = {
                "No": "no",
                "Name": "name",
                "Foreign Name": "foreignName",
                "Student ID (BC Number)": "studentID",
                "Gender": "gender",
                "Dob": "dob",
                "Age": "age",
                "Race": "race",
                "Citizenship": "citizenship",
                "Residential Status": "residentialStatus",
                "Religion": "religion",
                "Mother Tongue language": "motherTonguelanguage",
                "Child of a staff": "childOfStaff",
                "Household Income": "householdIncome",
                "Subsidy Type": "subsidyType",
                "Other Residential Remarks": "otherResidentialRemarks",
                "Siblings 1": "siblings1",
                "Siblings Relationship 1": "siblingsRelationship1",
                "Siblings 2": "siblings2",
                "Siblings Relationship 2": "siblingsRelationship2",
                "Siblings 3": "siblings3",
                "Siblings Relationship 3": "siblingsRelationship3",
                "Siblings 4": "siblings4",
                "Siblings Relationship 4": "siblingsRelationship4",
                "Medical Conditions": "medicalConditions",
                "Vaccination History": "vaccinationHistory",
                "Allergy History (Food/Medication)": "allergyHistory",
                "Special Diet": "specialDiet",
                "Special Needs": "specialNeeds",
                "Family Doctor Number": "familyDoctorNum",
                "Admission Date": "admissionDate",
                "Withdrawal date": "withdrawalDate",
                "Program Type": "programType",
                "Class name": "className",
                "Class Session": "classSession",
                "Class level": "classLevel",
                "Transportation Number": "transportationNum",
                "Payment Method": "paymentMethod",
                "Bank Name": "bankName",
                "Bank Account Holder": "bankAccountHolder",
                "Bank Account Code": "bankAccountCode",
                "Branch Code": "branchCode",
                "Bank Account Number": "bankAccountNumber",
                "Payment Method Approval Date": "paymentMethodApprovalDate",
                "Attention To": "attentionTo",
                "Payee ID": "payeeID",
                "Amount": "amount",
                "Payment Method": "paymentMethod",
                "Bank Name": "bankName",
                "Bank Account Holder": "bankAccountHolder",
                "Bank Account Code": "bankAccountCode",
                "Branch Code": "branchCode",
                "Bank Account Number": "bankAccountNumber",
                "Secondary Payee ID": "secondaryPayeeID",
                "Payment Method Approval Date": "paymentMethodApprovalDate",
                "Attention To": "attentionTo",
                "Payment Method": "paymentMethod",
                "Bank Name": "bankName",
                "Bank Account Holder": "bankAccountHolder",
                "Bank Account Code": "bankAccountCode",
                "Branch Code": "branchCode",
                "Bank Account No.": "bankAccountNo",
                "Payment Method Approval Reference": "paymentMethodApprovalReference",
                "Payment Method Approval Date": "paymentMethodApprovalDate",
                "Deposit Option": "depositOption",
                "Parent Relationship 1": "parentRelationship1",
                "Name 1": "name1",
                "Email 1": "email1",
                "Mobile No. 1": "mobileNo1",
                "Phone No. 1": "phoneNo1",
                "NRIC /ID 1": "NRIC1",
                "Race 1": "race1",
                "Citizenship 1": "citizenship1",
                "Occupation 1": "occupation1",
                "Main contact 1": "mainContact1",
                "Authorised Pick Up Person 1": "authorisedPickUpPerson1",
                "Email Invoice Receipt 1": "emailInvoiceReceipt1",
                "Email checkin 1": "emailCheckin1",
                "Parent Relationship 2": "parentRelationship2",
                "Name 2": "name2",
                "Email 2": "email2",
                "Mobile No. 2": "mobileNo2",
                "Phone No. 2": "phoneNo2",
                "NRIC /ID 2": "NRIC2",
                "Race 2": "race2",
                "Citizenship 2": "citizenship2",
                "Occupation 2": "occupation2",
                "Main contact 2": "mainContact2",
                "Authorised Pick Up Person 2": "authorisedPickUpPerson2",
                "Email Invoice Receipt 2": "emailInvoiceReceipt2",
                "Email checkin 2": "emailCheckin2",
                "Parent Relationship 3": "parentRelationship3",
                "Name 3": "name3",
                "Email 3": "email3",
                "Mobile No. 3": "mobileNo3",
                "Phone No. 3": "phoneNo3",
                "NRIC /ID 3": "NRIC3",
                "Race 3": "race3",
                "Citizenship 3": "citizenship3",
                "Occupation 3": "occupation3",
                "Main contact 3": "mainContact3",
                "Authorised Pick Up Person 3": "authorisedPickUpPerson3",
                "Email Invoice Receipt 3": "emailInvoiceReceipt3",
                "Email checkin 3": "emailCheckin3",
                "Block no.": "blockno",
                "Building": "building",
                "Street": "street",
                "Unit": "unit",
                "Postal Code": "postalCode",
                "Transport Option": "transportOption",
                "Block no.": "blockno",
                "Building": "building",
                "Street": "street",
                "Unit": "unit",
                "Postal Code": "postalCode",
                "Transport Option": "transportOption",
                "Address Line 1": "addressLine1",
                "Address Line 2": "addressLine2",
                "Postal Code": "postalCode",
                "Transport Option": "transportOption",
                "Relationship 1": "relationship1EC",
                "Name 1": "name1EC",
                "Mobile Number 1": "mobileNumber1EC",
                "Phone Number 1": "phoneNumber1EC",
                "Email 1": "email1EC",
            }

            max_badge_no = ChildrenTempTable.objects.aggregate(Max('badgeNo')).get('badgeNo__max')
            if max_badge_no:
                next_badge_no = int(max_badge_no) + 1
            else:
                next_badge_no = 10001  # Start from 10001 if no badge number exists

            # List of columns to remove
            columns_to_remove = [
                'School name', 'PT10 B6', 'Export date',
                'CHILD BASIC INFORMATION', 'Siblings', 'Health Information',
                'School Information', 'Fees Payment Primary', 'Fees Payment Secondary',
                'Refund Payment', 'Parent 1', 'Parent 2', 'Parent 3',
                'Residential Address (Mother)', 'Residential Address (Father)', 
                'Residential Address 1', 'Emergency contact 1'
            ]

            errors = []
            successful_uploads = 0
            failed_uploads = 0

            def insert_temp_table(row):
                row = {key: value for key, value in row.items() if key not in columns_to_remove}
                row = {csv_to_model_mapping.get(key, key): value for key, value in row.items()}
                row = {key.lstrip('\ufeff'): value for key, value in row.items()}
                row = {key: (value if value.strip() else 'null') for key, value in row.items()}
                row['Dob'] = format_date(row.get('Dob', ''))
                row['childOfStaff'] = convert_bool(row.get('childOfStaff', 'No'))
                row['mainContact1'] = convert_bool(row.get('mainContact1', 'No'))
                row['authorisedPickUpPerson1'] = convert_bool(row.get('authorisedPickUpPerson1', 'No'))
                row['emailInvoiceReceipt1'] = convert_bool(row.get('emailInvoiceReceipt1', 'No'))
                row['emailCheckin1'] = convert_bool(row.get('emailCheckin1', 'No'))
                row['mainContact2'] = convert_bool(row.get('mainContact1', 'No'))
                row['authorisedPickUpPerson2'] = convert_bool(row.get('authorisedPickUpPerson1', 'No'))
                row['emailInvoiceReceipt2'] = convert_bool(row.get('emailInvoiceReceipt1', 'No'))
                row['emailCheckin2'] = convert_bool(row.get('emailCheckin1', 'No'))
                row['mainContact3'] = convert_bool(row.get('mainContact1', 'No'))
                row['authorisedPickUpPerson3'] = convert_bool(row.get('authorisedPickUpPerson1', 'No'))
                row['emailInvoiceReceipt3'] = convert_bool(row.get('emailInvoiceReceipt1', 'No'))
                row['emailCheckin3'] = convert_bool(row.get('emailCheckin1', 'No'))
                row['badgeNo'] = next_badge_no
                serializer = ChildrenTempTableSerializer(data=row)
                if serializer.is_valid():
                    serializer.save()
                    return serializer.instance  # Return the model instance
                else:
                    errors.append(serializer.errors)
                    return None

            for row in csv_data:
                temp_record = insert_temp_table(row)
                if temp_record:
                    successful_uploads += 1
                else:
                    failed_uploads += 1
                # populate_core_service_children_table(temp_record)

            return Response({
                'message': 'CSV data imported successfully',
                'successful_uploads': successful_uploads,
                'failed_uploads': failed_uploads,
                'errors': errors
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MigrateIntoCoreServiceChildrenTable(APIView):
    def get(self, request, *args, **kwargs):
        cache_key = f'migrated_ids_{request.user.id}'
        migrated_ids = cache.get(cache_key, [])
        total_migrated = len(migrated_ids)
        return Response({'migrated_records': total_migrated})
    
    def post(self, request, *args, **kwargs):
        badgeNo = request.data.get('badgeNo')
        className = request.data.get('className')
        filters = {}
        if badgeNo != "All": filters['badgeNo'] = badgeNo
        if className != "All": filters['className'] = className
        records = ChildrenTempTable.objects.filter(**filters)
        total_records = records.count()
        print(total_records)
        migrated_records = 0
        errors = []

        if total_records == 0:
            return Response({"message": "No records to migrate"}, status=status.HTTP_200_OK)
        
        cache_key = f'migrated_ids_{request.user.id}'

        try:
            cache.set(cache_key, [], timeout=3600)
            migrated_ids = cache.get(cache_key, [])
            errors = []
            for record in records:
                core_service_children_data = {
                    'fullName': record.name,
                    'birthCertNo': record.studentID,
                    'birthDate': record.dob,
                    'birthCountry': record.citizenship,
                    'ethnicity': record.race,
                    'religion': record.religion,
                    'gender': record.gender,
                    'age': record.age
                }
                serializer = CoreServiceChildrenTableSerializer(data=core_service_children_data)
                if serializer.is_valid():
                    saved_record = serializer.save()
                    migrated_records += 1
                    migrated_ids.append(saved_record.id)
                else:
                    errors.append(serializer.errors)
            
            cache.set(cache_key, migrated_ids, timeout=3600)

            if errors:
                return Response({"message": "Migration completed with errors", "errors": errors}, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'total_records': total_records,
                'migrated_records': migrated_records,
                'migrated_ids': migrated_ids,
                'errors': errors
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)