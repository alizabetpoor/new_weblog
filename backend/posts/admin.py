from django.contrib import admin
from .models import Post,Comment
# Register your models here.

class Post_Admin(admin.ModelAdmin):
    list_display=("author","title","created","count_like")
    prepopulated_fields={"slug":("title",)}
class Comment_Admin(admin.ModelAdmin):
    list_display=("author","post","count_like","count_replies")

admin.site.register(Post,Post_Admin)
admin.site.register(Comment,Comment_Admin)