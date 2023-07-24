# Generated by Django 4.2.2 on 2023-07-14 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0002_activitytable'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImmunizationTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student', models.CharField(max_length=250)),
                ('date', models.CharField(max_length=250)),
                ('hepB', models.CharField(max_length=250)),
                ('dTap', models.CharField(max_length=250)),
                ('hib', models.CharField(max_length=250)),
                ('pcv', models.CharField(max_length=250)),
                ('polio', models.CharField(max_length=250)),
                ('rotavirus', models.CharField(max_length=250)),
                ('flu', models.CharField(max_length=250)),
                ('mmr', models.CharField(max_length=250)),
                ('var', models.CharField(max_length=250)),
                ('hepA', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
        migrations.CreateModel(
            name='MenuPlanningTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mealType', models.CharField(max_length=250)),
                ('date', models.CharField(max_length=250)),
                ('time', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=250, null=True)),
                ('duplicate', models.CharField(max_length=250)),
                ('upUntil', models.CharField(max_length=250)),
                ('foodName', models.CharField(max_length=250)),
                ('foodCategory', models.CharField(max_length=250)),
                ('quantity', models.CharField(max_length=250)),
                ('unitOfMeasure', models.CharField(max_length=250)),
                ('classroom', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
        migrations.CreateModel(
            name='SleepCheckTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student', models.CharField(max_length=250)),
                ('date', models.CharField(max_length=250)),
                ('time', models.CharField(max_length=250)),
                ('activity', models.CharField(max_length=250)),
                ('observation', models.CharField(max_length=250)),
                ('position', models.CharField(max_length=250)),
                ('note', models.CharField(max_length=250, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
    ]