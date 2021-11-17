# Generated by Django 2.2 on 2019-04-23 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='timesheet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('taskid', models.CharField(max_length=20)),
                ('date', models.DateField()),
                ('hours', models.CharField(default=['0.0', '0.0', '0.0', '0.0', '0.0', '0.0', '0.0'], max_length=56)),
                ('sum_hours', models.PositiveSmallIntegerField(default=0)),
                ('user', models.CharField(max_length=20)),
                ('user_role', models.CharField(blank=True, max_length=20, null=True)),
                ('user_skill', models.CharField(blank=True, max_length=20, null=True)),
                ('approved', models.CharField(default='Y', max_length=1)),
                ('approved_by', models.CharField(blank=True, max_length=20, null=True)),
                ('tstamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('is_billable', models.BooleanField(default=True)),
            ],
        ),
    ]