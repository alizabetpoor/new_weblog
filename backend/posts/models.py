from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="posts")
    title=models.CharField(max_length=70,verbose_name="عنوان")
    slug=models.SlugField(max_length=40,verbose_name="لینک مطلب")
    image=models.ImageField(upload_to=f"{author.username}/blog_images",verbose_name="عکس مطلب")
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)