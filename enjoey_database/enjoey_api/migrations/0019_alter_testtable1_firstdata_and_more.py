# Generated by Django 4.2.7 on 2024-01-22 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0018_rename_contents_testtable1_firstdata_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testtable1',
            name='firstData',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='testtable1',
            name='secondData',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='testtable2',
            name='firstData',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='testtable2',
            name='secondData',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='testtable3',
            name='firstData',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='testtable3',
            name='secondData',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='testtable4',
            name='firstData',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='testtable4',
            name='secondData',
            field=models.CharField(max_length=250),
        ),
    ]
