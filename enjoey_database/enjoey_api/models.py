from django.db import models
from django.utils.text import slugify

class ChildTable(models.Model):
    childId = models.CharField(primary_key=True, db_index=True, max_length=250)
    childNameENG = models.CharField(max_length=250)
    childDOB = models.CharField(max_length=250)
    childNRIC = models.CharField(max_length=250)
    childSex = models.CharField(max_length=250)
    childHeight = models.CharField(max_length=250)
    childWeight = models.CharField(max_length=250)
    languageSpoken = models.CharField(max_length=250)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.childId
    
    def save(self, *args, **kwargs):
        if not self.childId:
            self.childId = slugify(self.childNameENG + "-" + self.childNRIC)
        super().save(*args, **kwargs)

class FamilyTable(models.Model):
    familyId = models.CharField(primary_key=True, db_index=True, max_length=250)
    name = models.CharField(max_length=50)
    nRIC = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    occupation = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    relationship = models.CharField(max_length=250)
    childId = models.CharField(max_length=250)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.familyId
    
    def save(self, *args, **kwargs):
        if not self.familyId:
            self.familyId = slugify(self.name + "-" + self.nRIC)
        super().save(*args, **kwargs)

class AdmissionTable(models.Model):
    admissionId = models.CharField(primary_key=True, db_index=True, max_length=250)
    title = models.CharField(max_length=250)
    childId = models.CharField(max_length=250)
    registrationDate = models.CharField(max_length=250)
    status = models.BooleanField(default=False)
    programId = models.CharField(max_length=250)
    commencementDate = models.CharField(max_length=250)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.admissionId
    
    def save(self, *args, **kwargs):
        if not self.admissionId:
            self.admissionId = slugify(self.title + "-" + self.childId + "-" + self.programId)
        super().save(*args, **kwargs)

class ProgramTable(models.Model):
    programId = models.CharField(primary_key=True, db_index=True, max_length=250)
    programName = models.CharField(max_length=250)
    programDescription = models.CharField(max_length=250)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.programId
    
    def save(self, *args, **kwargs):
        if not self.programId:
            self.programId = slugify(self.programName)
        super().save(*args, **kwargs)

class ActivityTable(models.Model):
    activityId = models.CharField(primary_key=True, db_index=True, max_length=250)
    activityType = models.CharField(max_length=250)
    student = models.CharField(max_length=250)
    date = models.CharField(max_length=250)
    time = models.CharField(max_length=250)
    foodType = models.CharField(max_length=250)
    foodQuantity = models.CharField(max_length=250)
    mealType = models.CharField(max_length=250)
    mealItem = models.CharField(max_length=250)
    note = models.CharField(max_length=250, null=True)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)

    def __str__(self):
        return self.activityId
    
    def save(self, *args, **kwargs):
        if not self.activityId:
            self.activityId = slugify(self.activityType + "-" + self.student + "-" + self.date + "-" +self.time)
        super().save(*args, **kwargs)

class MenuPlanningTable(models.Model):
    mealType = models.CharField(max_length=250)
    date = models.CharField(max_length=250)
    time = models.CharField(max_length=250)
    description = models.CharField(max_length=250, null=True)
    duplicate = models.CharField(max_length=250)
    upUntil = models.CharField(max_length=250)
    foodName = models.CharField(max_length=250)
    foodCategory = models.CharField(max_length=250)
    quantity = models.CharField(max_length=250)
    unitOfMeasure = models.CharField(max_length=250)
    classroom = models.CharField(max_length=250)
    created_at = models.DateTimeField("created_at", auto_now_add=True)
    updated_at = models.DateTimeField("updated_at", auto_now=True)
    deleted_at = models.DateTimeField("deleted_at", null=True, blank=True)
