from rest_framework.serializers import ModelSerializer
from posts.models import Category,Post,Comment
from profiles.models import User



class User_Serilizer(ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","first_name","last_name",]

class Post_Serializer(ModelSerializer):
    author=User_Serilizer(many=False,read_only=True)
    class Meta:
        model=Post
        fields="__all__"
        #read_only_fields = ["author"]


class Comment_Serializer(ModelSerializer):
    class Meta:
        model=Comment
        fields="__all__"

        
class Category_Serializer(ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"


