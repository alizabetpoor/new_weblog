# Generated by Django 3.2.8 on 2022-01-01 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_auto_20220101_2127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='create',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
