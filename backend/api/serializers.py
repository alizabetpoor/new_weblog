from rest_framework.serializers import ModelSerializer,SerializerMethodField,ImageField
from posts.models import Category,Post,Comment,Bookmark
from profiles.models import User,Profile
from django.contrib.humanize.templatetags.humanize import naturaltime


class Profile_Serializer(ModelSerializer):
    class Meta:
        model=Profile
        fields="__all__"
class User_Serilizer(ModelSerializer):
    profile=Profile_Serializer(read_only=True,many=False)
    class Meta:
        model=User
        fields=["id","username","first_name","last_name","profile"]

class Post_Serializer(ModelSerializer):
    author=User_Serilizer(many=False,read_only=True)
    image=ImageField()
    time_post_created = SerializerMethodField()
    def get_time_post_created(self, obj):
        return naturaltime(obj.created)
    class Meta:
        model=Post
        fields="__all__"
        #read_only_fields = ["author"]

class Bookmark_Serializer(ModelSerializer):
    user=User_Serilizer(many=False,read_only=True)
    class Meta:
        model=Bookmark
        fields="__all__"
        depth=1

class Comment_Serializer(ModelSerializer):
    class Meta:
        model=Comment
        fields="__all__"

        
class Category_Serializer(ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"


