from rest_framework.serializers import ModelSerializer
from posts.models import Category,Post,Comment

class Post_Serializer(ModelSerializer):
    class Meta:
        model=Post
        fields="__all__"
        read_only_fields = ["author"]


class Comment_Serializer(ModelSerializer):
    class Meta:
        model=Comment
        fields="__all__"

        
class Category_Serializer(ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"