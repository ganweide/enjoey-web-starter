# Generated by Django 4.2.7 on 2024-08-14 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0035_eventcalendartable_allowoptions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventcalendartable',
            name='category',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='date',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='duration',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='endDate',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='endTime',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='inviteLink',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='receipt',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='savedOptions',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='startDate',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='startTime',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='time',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='eventcalendartable',
            name='title',
            field=models.CharField(max_length=250),
        ),
    ]
