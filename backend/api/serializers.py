from rest_framework.serializers import ModelSerializer,SerializerMethodField,ImageField
from posts.models import Category,Post,Comment,Bookmark
from profiles.models import User,Profile
from django.contrib.humanize.templatetags.humanize import naturaltime

class Profile_Serializer(ModelSerializer):
    class Meta:
        model=Profile
        fields="__all__"
class User_Serilizer(ModelSerializer):
    profile=Profile_Serializer(many=False)
    class Meta:
        model=User
        fields=["id","username","first_name","last_name","email","profile"]
        read_only_fields=["username","email"]


    def update(self, instance, validated_data):

        profile_data=validated_data.pop("profile")
        profile=instance.profile
        instance.first_name=validated_data.get("first_name",instance.first_name)
        instance.last_name=validated_data.get("last_name",instance.last_name)
        instance.save()

        profile.display_name=profile_data.get("display_name",profile.display_name)
        profile.birthday=profile_data.get("birthday",profile.birthday)
        profile.phonenumber=profile_data.get("phonenumber",profile.phonenumber)
        profile.save()



        return instance 



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


class Post_Serializer(ModelSerializer):
    author=User_Serilizer(many=False,read_only=True)
    image=ImageField()
    category=Category_Serializer(many=True)
    time_post_created = SerializerMethodField()
    def get_time_post_created(self, obj):
        return naturaltime(obj.created)
    class Meta:
        model=Post
        fields="__all__"
        #read_only_fields = ["author"]