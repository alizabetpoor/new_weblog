from django.db import models
from django.contrib.auth.models import User
# Create your models here.



#model post
class Post(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE,related_name="posts")
    title=models.CharField(max_length=70,verbose_name="عنوان")
    slug=models.SlugField(max_length=40,verbose_name="لینک مطلب")
    image=models.ImageField(upload_to=f"{author.username}/blog_images",verbose_name="عکس مطلب")
    created=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)



class Like(models.Model):
    post=models.ForeignKey(Post,on_delete=models.CASCADE,related_name="likes")
    users=models.ManyToManyField(User)

    def __str__(self) -> str:
        return f"عنوان پست:{self.post.title}"

    def count_likes(self):
        return self.users.count