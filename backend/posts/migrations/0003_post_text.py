# Generated by Django 3.2.8 on 2021-10-13 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20211013_1203'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='text',
            field=models.TextField(default='salam', verbose_name='متن پست'),
            preserve_default=False,
        ),
    ]