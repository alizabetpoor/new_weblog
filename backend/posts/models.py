from django.db import models
from profiles.models import User
from django.contrib.auth import get_user_model
# Create your models here.


#category for posts
class Category(models.Model):
    name=models.CharField(max_length=70)
    parent=models.ForeignKey("self",on_delete=models.CASCADE,null=True,blank=True)


    def __str__(self) -> str:
        return self.name
class PostManager(models.Manager):
    def created(self):
        return self.order_by("-created")
#model post
class Post(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="posts")
    title=models.CharField(max_length=70,verbose_name="عنوان")
    slug=models.SlugField(max_length=40,verbose_name="لینک مطلب",null=True,blank=True)
    image=models.ImageField(upload_to="blog_images",verbose_name="عکس مطلب")
    text=models.TextField(verbose_name="متن پست")
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)
    likes=models.ManyToManyField(User,blank=True)
    category=models.ManyToManyField(Category,blank=True)
    class Meta:
        verbose_name="پست"
        verbose_name_plural="پست ها"
        ordering = ['-created']

    def __str__(self) -> str:
        return f"عنوان مطلب:{self.title}"

    def display_categorys(self):
        return ",".join([category.name for category in self.category.all()])
    display_categorys.short_description="دسته بندی"
    def count_like(self):
        return self.likes.count()

    count_like.short_description="تعداد لایک"



    objects=PostManager()

class Comment(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="comments")
    post=models.ForeignKey(Post,on_delete=models.CASCADE,related_name="comments")
    text=models.TextField(verbose_name="متن کامنت")
    likes=models.ManyToManyField(User,blank=True)
    parent_comment=models.ForeignKey("self",blank=True,null=True,on_delete=models.CASCADE,related_name="replies")

    class Meta:
        verbose_name="کامنت"
        verbose_name_plural="کامنت ها"


    def count_replies(self):
        return self.replies.count() 

    count_replies.short_description="تعداد رپلای"

    def count_like(self):
        return self.likes.count()

    count_like.short_description="تعداد لایک"


class Bookmark(models.Model):
    user=models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    created=models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('user', 'post',)