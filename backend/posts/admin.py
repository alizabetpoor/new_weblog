from django.contrib import admin
from .models import Category, Post,Comment,Bookmark
# Register your models here.

class Post_Admin(admin.ModelAdmin):
    list_display=("author","title","created","display_categorys","count_like")
    prepopulated_fields={"slug":("title",)}
class Comment_Admin(admin.ModelAdmin):
    list_display=("author","post","count_like","count_replies")

class Bookmark_Admin(admin.ModelAdmin):
    list_disPlay=("user","post")
class Category_Admin(admin.ModelAdmin):
    list_display=("name","parent")

admin.site.register(Post,Post_Admin)
admin.site.register(Comment,Comment_Admin)
admin.site.register(Category,Category_Admin)
admin.site.register(Bookmark,Bookmark_Admin)