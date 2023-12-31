# Generated by Django 4.2.7 on 2023-12-18 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0015_emailtemplatetable'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailTemplateHtmlTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('templateName', models.CharField(max_length=250)),
                ('htmlFormat', models.CharField()),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updatedAt', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deletedAt', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
        migrations.CreateModel(
            name='EmailTemplateJsonTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('templateName', models.CharField(max_length=250)),
                ('jsonFormat', models.CharField()),
                ('createdAt', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updatedAt', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deletedAt', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
        migrations.DeleteModel(
            name='EmailTemplateTable',
        ),
    ]
