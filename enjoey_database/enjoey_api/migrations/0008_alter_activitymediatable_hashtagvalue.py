# Generated by Django 4.2.7 on 2023-11-23 04:31

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0007_activitymediatable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activitymediatable',
            name='hashtagValue',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=250), blank=True, default=list, size=None),
        ),
    ]
