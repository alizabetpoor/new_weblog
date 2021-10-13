from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BLANK_CHOICE_DASH
# Create your models here.

#model like of post
class Like(models.Model):
    users=models.ManyToManyField(User,blank=True)


    def count_likes(self):
        return self.users.count


#model post
class Post(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="posts")
    title=models.CharField(max_length=70,verbose_name="عنوان")
    slug=models.SlugField(max_length=40,verbose_name="لینک مطلب")
    image=models.ImageField(upload_to=f"{author.username}/blog_images",verbose_name="عکس مطلب")
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)
    likes=models.ForeignKey(Like,on_delete=models.DO_NOTHING)


    def count_likes(self):
        return self.likes.count


class Comment(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="comments")
    post=models.ForeignKey(Post,on_delete=models.CASCADE,related_name="comments")
    text=models.TextField(verbose_name="متن کامنت")
    likes=models.ForeignKey(Like,on_delete=models.DO_NOTHING)
    replies=models.ForeignKey("self",blank=True,null=True,on_delete=models.CASCADE)