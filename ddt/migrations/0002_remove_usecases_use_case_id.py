# Generated by Django 3.0.8 on 2020-07-17 00:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ddt', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usecases',
            name='use_case_id',
        ),
    ]
