# Generated by Django 4.2.7 on 2023-12-14 04:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('enjoey_api', '0013_appointmenttable_appointmenttimeslotstable_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointmenttable',
            old_name='branchName',
            new_name='branchId',
        ),
        migrations.RenameField(
            model_name='appointmenttimeslotstable',
            old_name='branchName',
            new_name='branchId',
        ),
    ]
