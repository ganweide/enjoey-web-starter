# Generated by Django 4.2.6 on 2023-11-03 08:30

from django.db import migrations, models
import enjoey_api.storagebackend
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0005_surveysettingstable_delete_surveysettings'),
    ]

    operations = [
        migrations.CreateModel(
            name='PDFFiles',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('file', models.FileField(storage=enjoey_api.storagebackend.PDFStorage(), upload_to='')),
                ('stored_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
