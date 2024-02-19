# Generated by Django 4.2.7 on 2024-02-19 02:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0021_delete_testtable1_delete_testtable2_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentsTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('documentName', models.CharField(max_length=250)),
                ('isRequired', models.BooleanField()),
                ('documentURL', models.FileField(upload_to='')),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updatedAt', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deletedAt', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
    ]
