# Generated by Django 3.0.8 on 2020-07-16 22:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Topics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic_id', models.IntegerField()),
                ('title', models.CharField(default='', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Usecases',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('use_case_id', models.IntegerField()),
                ('title', models.CharField(default='', max_length=255)),
                ('topic', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ddt.Topics')),
            ],
        ),
        migrations.CreateModel(
            name='Tools',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tool_id', models.IntegerField()),
                ('tool_name', models.CharField(default='', max_length=255)),
                ('topic', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ddt.Topics')),
            ],
        ),
        migrations.CreateModel(
            name='KnowledgeBase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kb_id', models.IntegerField()),
                ('tool', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ddt.Tools')),
                ('use_case', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ddt.Usecases')),
            ],
        ),
        migrations.CreateModel(
            name='Integrations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('integration_id', models.IntegerField()),
                ('hive', models.BooleanField(default=False)),
                ('impala', models.BooleanField(default=False)),
                ('vertica', models.BooleanField(default=False)),
                ('sqlserver', models.BooleanField(default=False)),
                ('oracle', models.BooleanField(default=False)),
                ('mongodb', models.BooleanField(default=False)),
                ('cassandra', models.BooleanField(default=False)),
                ('excel', models.BooleanField(default=False)),
                ('postgresql', models.BooleanField(default=False)),
                ('apachespark', models.BooleanField(default=False)),
                ('redshift', models.BooleanField(default=False)),
                ('azure', models.BooleanField(default=False)),
                ('snowflake', models.BooleanField(default=False)),
                ('bigquery', models.BooleanField(default=False)),
                ('salesforce', models.BooleanField(default=False)),
                ('flink', models.BooleanField(default=False)),
                ('elasticsearch', models.BooleanField(default=False)),
                ('influxdb', models.BooleanField(default=False)),
                ('tool', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ddt.Tools')),
            ],
        ),
    ]