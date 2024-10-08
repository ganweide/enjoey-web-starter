# Generated by Django 4.2.7 on 2024-08-15 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data_migration_api', '0006_alter_coreservicefamily_address_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='attentionTo',
            new_name='attentionTo1',
        ),
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='bankAccountCode',
            new_name='attentionTo2',
        ),
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='bankAccountHolder',
            new_name='bankAccountCode1',
        ),
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='bankAccountNumber',
            new_name='bankAccountCode2',
        ),
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='bankName',
            new_name='bankAccountCode3',
        ),
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='branchCode',
            new_name='bankAccountHolder1',
        ),
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='paymentMethod',
            new_name='bankAccountHolder2',
        ),
        migrations.RenameField(
            model_name='childrentemptable',
            old_name='paymentMethodApprovalDate',
            new_name='bankAccountHolder3',
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='bankAccountNumber1',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='bankAccountNumber2',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='bankName1',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='bankName2',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='bankName3',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='branchCode1',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='branchCode2',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='branchCode3',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='paymentMethod1',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='paymentMethod2',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='paymentMethod3',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='paymentMethodApprovalDate1',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='paymentMethodApprovalDate2',
            field=models.CharField(max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='childrentemptable',
            name='paymentMethodApprovalDate3',
            field=models.CharField(max_length=250, null=True),
        ),
    ]
