# Generated by Django 4.2.7 on 2024-08-15 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_migration_api', '0005_childrentemptable_badgeno_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coreservicefamily',
            name='address',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='birthCountry',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='birthIC',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='country',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='creator',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='email',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='firstName',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='gender',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='isAllowPickup',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='isArchived',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='isBillable',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='isEmergencyContact',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='isMobileAccess',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='isPrimary',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='isWebAccess',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='lastName',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='occupation',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='phone',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='postcode',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='profileImage',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='relationship',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='state',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='coreservicefamily',
            name='userId',
            field=models.CharField(max_length=250, null=True),
        ),
    ]
