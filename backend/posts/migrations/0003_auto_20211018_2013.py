# Generated by Django 3.2.8 on 2021-10-18 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_rename_cateogry_post_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='category',
        ),
        migrations.AddField(
            model_name='post',
            name='category',
            field=models.ManyToManyField(blank=True, to='posts.Category'),
        ),
    ]