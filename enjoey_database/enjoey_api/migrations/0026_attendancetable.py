# Generated by Django 4.2.7 on 2024-04-05 03:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0025_tenantpaymentkeysettings_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttendanceTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('date', models.CharField(max_length=250)),
                ('status', models.CharField(max_length=250)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
