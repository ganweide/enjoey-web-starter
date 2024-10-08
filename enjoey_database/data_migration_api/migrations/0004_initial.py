# Generated by Django 4.2.7 on 2024-07-19 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChildrenTempTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no', models.CharField(max_length=250, null=True)),
                ('name', models.CharField(max_length=250, null=True)),
                ('foreignName', models.CharField(max_length=250, null=True)),
                ('studentID', models.CharField(max_length=250, null=True)),
                ('gender', models.CharField(max_length=250, null=True)),
                ('dob', models.CharField(max_length=250, null=True)),
                ('age', models.CharField(max_length=250, null=True)),
                ('race', models.CharField(max_length=250, null=True)),
                ('citizenship', models.CharField(max_length=250, null=True)),
                ('residentialStatus', models.CharField(max_length=250, null=True)),
                ('religion', models.CharField(max_length=250, null=True)),
                ('motherTonguelanguage', models.CharField(max_length=250, null=True)),
                ('childOfStaff', models.BooleanField(default=False)),
                ('householdIncome', models.CharField(max_length=250, null=True)),
                ('subsidyType', models.CharField(max_length=250, null=True)),
                ('otherResidentialRemarks', models.CharField(max_length=250, null=True)),
                ('siblings1', models.CharField(max_length=250, null=True)),
                ('siblingsRelationship1', models.CharField(max_length=250, null=True)),
                ('siblings2', models.CharField(max_length=250, null=True)),
                ('siblingsRelationship2', models.CharField(max_length=250, null=True)),
                ('siblings3', models.CharField(max_length=250, null=True)),
                ('siblingsRelationship3', models.CharField(max_length=250, null=True)),
                ('siblings4', models.CharField(max_length=250, null=True)),
                ('siblingsRelationship4', models.CharField(max_length=250, null=True)),
                ('medicalConditions', models.CharField(max_length=250, null=True)),
                ('vaccinationHistory', models.CharField(max_length=250, null=True)),
                ('allergyHistory', models.CharField(max_length=250, null=True)),
                ('specialDiet', models.CharField(max_length=250, null=True)),
                ('specialNeeds', models.CharField(max_length=250, null=True)),
                ('familyDoctorNum', models.CharField(max_length=250, null=True)),
                ('admissionDate', models.CharField(max_length=250, null=True)),
                ('withdrawalDate', models.CharField(max_length=250, null=True)),
                ('programType', models.CharField(max_length=250, null=True)),
                ('className', models.CharField(max_length=250, null=True)),
                ('classSession', models.CharField(max_length=250, null=True)),
                ('classLevel', models.CharField(max_length=250, null=True)),
                ('transportationNum', models.CharField(max_length=250, null=True)),
                ('payeeID', models.CharField(max_length=250, null=True)),
                ('amount', models.CharField(max_length=250, null=True)),
                ('bankAccountNumber', models.CharField(max_length=250, null=True)),
                ('secondaryPayeeID', models.CharField(max_length=250, null=True)),
                ('attentionTo', models.CharField(max_length=250, null=True)),
                ('paymentMethod', models.CharField(max_length=250, null=True)),
                ('bankName', models.CharField(max_length=250, null=True)),
                ('bankAccountHolder', models.CharField(max_length=250, null=True)),
                ('bankAccountCode', models.CharField(max_length=250, null=True)),
                ('branchCode', models.CharField(max_length=250, null=True)),
                ('bankAccountNo', models.CharField(max_length=250, null=True)),
                ('paymentMethodApprovalReference', models.CharField(max_length=250, null=True)),
                ('paymentMethodApprovalDate', models.CharField(max_length=250, null=True)),
                ('depositOption', models.CharField(max_length=250, null=True)),
                ('parentRelationship1', models.CharField(max_length=250, null=True)),
                ('name1', models.CharField(max_length=250, null=True)),
                ('email1', models.CharField(max_length=250, null=True)),
                ('mobileNo1', models.CharField(max_length=250, null=True)),
                ('phoneNo1', models.CharField(max_length=250, null=True)),
                ('NRIC1', models.CharField(max_length=250, null=True)),
                ('race1', models.CharField(max_length=250, null=True)),
                ('citizenship1', models.CharField(max_length=250, null=True)),
                ('occupation1', models.CharField(max_length=250, null=True)),
                ('mainContact1', models.BooleanField(default=False)),
                ('authorisedPickUpPerson1', models.BooleanField(default=False)),
                ('emailInvoiceReceipt1', models.BooleanField(default=False)),
                ('emailCheckin1', models.BooleanField(default=False)),
                ('parentRelationship2', models.CharField(max_length=250, null=True)),
                ('name2', models.CharField(max_length=250, null=True)),
                ('email2', models.CharField(max_length=250, null=True)),
                ('mobileNo2', models.CharField(max_length=250, null=True)),
                ('phoneNo2', models.CharField(max_length=250, null=True)),
                ('NRIC2', models.CharField(max_length=250, null=True)),
                ('race2', models.CharField(max_length=250, null=True)),
                ('citizenship2', models.CharField(max_length=250, null=True)),
                ('occupation2', models.CharField(max_length=250, null=True)),
                ('mainContact2', models.BooleanField(default=False)),
                ('authorisedPickUpPerson2', models.BooleanField(default=False)),
                ('emailInvoiceReceipt2', models.BooleanField(default=False)),
                ('emailCheckin2', models.BooleanField(default=False)),
                ('parentRelationship3', models.CharField(max_length=250, null=True)),
                ('name3', models.CharField(max_length=250, null=True)),
                ('email3', models.CharField(max_length=250, null=True)),
                ('mobileNo3', models.CharField(max_length=250, null=True)),
                ('phoneNo3', models.CharField(max_length=250, null=True)),
                ('NRIC3', models.CharField(max_length=250, null=True)),
                ('race3', models.CharField(max_length=250, null=True)),
                ('citizenship3', models.CharField(max_length=250, null=True)),
                ('occupation3', models.CharField(max_length=250, null=True)),
                ('mainContact3', models.BooleanField(default=False)),
                ('authorisedPickUpPerson3', models.BooleanField(default=False)),
                ('emailInvoiceReceipt3', models.BooleanField(default=False)),
                ('emailCheckin3', models.BooleanField(default=False)),
                ('blockno', models.CharField(max_length=250, null=True)),
                ('building', models.CharField(max_length=250, null=True)),
                ('street', models.CharField(max_length=250, null=True)),
                ('unit', models.CharField(max_length=250, null=True)),
                ('addressLine1', models.CharField(max_length=250, null=True)),
                ('addressLine2', models.CharField(max_length=250, null=True)),
                ('postalCode', models.CharField(max_length=250, null=True)),
                ('transportOption', models.CharField(max_length=250, null=True)),
                ('relationship1EC', models.CharField(max_length=250, null=True)),
                ('name1EC', models.CharField(max_length=250, null=True)),
                ('mobileNumber1EC', models.CharField(max_length=250, null=True)),
                ('phoneNumber1EC', models.CharField(max_length=250, null=True)),
                ('email1EC', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CoreServiceChildren',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='createdAt')),
                ('updatedAt', models.DateTimeField(auto_now=True, verbose_name='updatedAt')),
                ('tenantId', models.CharField(max_length=250, null=True)),
                ('branchId', models.CharField(max_length=250, null=True)),
                ('firstName', models.CharField(max_length=250, null=True)),
                ('lastName', models.CharField(max_length=250, null=True)),
                ('fullName', models.CharField(max_length=250, null=True)),
                ('birthCertNo', models.CharField(max_length=250, null=True)),
                ('birthIC', models.CharField(max_length=250, null=True)),
                ('birthDate', models.CharField(max_length=250, null=True)),
                ('birthOrder', models.CharField(max_length=250, null=True)),
                ('birthCountry', models.CharField(max_length=250, null=True)),
                ('ethnicity', models.CharField(max_length=250, null=True)),
                ('religion', models.CharField(max_length=250, null=True)),
                ('siblings', models.CharField(max_length=250, null=True)),
                ('profileImage', models.CharField(max_length=250, null=True)),
                ('gender', models.CharField(max_length=250, null=True)),
                ('age', models.CharField(max_length=250, null=True)),
                ('isActive', models.BooleanField(default=False)),
                ('isArchived', models.BooleanField(default=False)),
                ('notes', models.CharField(max_length=250, null=True)),
                ('isEnRolled', models.BooleanField(default=False)),
                ('admissionId', models.CharField(max_length=250, null=True)),
                ('isPresentToday', models.BooleanField(default=False)),
                ('isInToday', models.BooleanField(default=False)),
                ('isOutToday', models.BooleanField(default=False)),
                ('isWithdraw', models.BooleanField(default=False)),
                ('isMarkedWithdraw', models.BooleanField(default=False)),
                ('withDrawDate', models.CharField(max_length=250, null=True)),
                ('withDrawReason', models.CharField(max_length=250, null=True)),
                ('isMarkedPromote', models.CharField(max_length=250, null=True)),
                ('PromoteDate', models.CharField(max_length=250, null=True)),
                ('PromoteReason', models.CharField(max_length=250, null=True)),
                ('creator', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CoreServiceChildrenAllergies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('allergyType', models.CharField(max_length=250, null=True)),
                ('allergies', models.CharField(max_length=250, null=True)),
                ('allergicPrevent', models.CharField(max_length=250, null=True)),
                ('allergicSyndrome', models.CharField(max_length=250, null=True)),
                ('allergicAction', models.CharField(max_length=250, null=True)),
                ('haveMedicine', models.BooleanField(default=False)),
                ('enterBy', models.CharField(max_length=250, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='createdAt')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updatedAt')),
                ('child_id', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CoreServiceChildrenEnrollment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tenantId', models.CharField(max_length=250)),
                ('branchId', models.CharField(max_length=250)),
                ('academyYear', models.CharField(max_length=250)),
                ('enrollStartDate', models.CharField(max_length=250)),
                ('enrollEndDate', models.CharField(max_length=250)),
                ('status', models.CharField(max_length=250)),
                ('active', models.CharField(max_length=250)),
                ('isSpecial', models.BooleanField()),
                ('notes', models.CharField(max_length=250)),
                ('enrollBy', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='createdAt')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updatedAt')),
                ('children_id', models.CharField(max_length=250)),
                ('classroom_id', models.CharField(max_length=250)),
                ('program_id', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='CoreServiceChildrenMedicalContact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contactType', models.CharField(max_length=250)),
                ('specialtyType', models.CharField(max_length=250)),
                ('name', models.CharField(max_length=250)),
                ('phone', models.CharField(max_length=250)),
                ('address', models.CharField(max_length=250)),
                ('state', models.CharField(max_length=250)),
                ('country', models.CharField(max_length=250)),
                ('postcode', models.CharField(max_length=250)),
                ('notes', models.CharField(max_length=250)),
                ('enterBy', models.CharField(max_length=250)),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='createdAt')),
                ('updatedAt', models.DateTimeField(auto_now=True, verbose_name='updatedAt')),
                ('child_id', models.CharField(max_length=250)),
                ('isArchived', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='CoreServiceClassrooms',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tenantId', models.CharField(max_length=250)),
                ('branchId', models.CharField(max_length=250)),
                ('name', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='createdAt')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updatedAt')),
                ('maxCapacity', models.CharField(max_length=250)),
                ('availableCapacity', models.CharField(max_length=250)),
                ('academyYear', models.CharField(max_length=250)),
                ('isSpecial', models.BooleanField()),
                ('active', models.CharField(max_length=250)),
                ('isArchived', models.BooleanField()),
                ('enteredBy', models.CharField(max_length=250)),
                ('program_id', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='CoreServiceFamily',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.CharField(max_length=250)),
                ('firstName', models.CharField(max_length=250)),
                ('lastName', models.CharField(max_length=250)),
                ('phone', models.CharField(max_length=250)),
                ('email', models.CharField(max_length=250)),
                ('gender', models.CharField(max_length=250)),
                ('birthIC', models.CharField(max_length=250)),
                ('birthCountry', models.CharField(max_length=250)),
                ('occupation', models.CharField(max_length=250)),
                ('relationship', models.CharField(max_length=250)),
                ('profileImage', models.CharField(max_length=250)),
                ('address', models.CharField(max_length=250)),
                ('state', models.CharField(max_length=250)),
                ('country', models.CharField(max_length=250)),
                ('postcode', models.CharField(max_length=250)),
                ('isArchived', models.BooleanField()),
                ('isAllowPickup', models.BooleanField()),
                ('isEmergencyContact', models.BooleanField()),
                ('isBillable', models.BooleanField()),
                ('isPrimary', models.BooleanField()),
                ('isWebAccess', models.BooleanField()),
                ('isMobileAccess', models.BooleanField()),
                ('creator', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='createdAt')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updatedAt')),
            ],
        ),
    ]
