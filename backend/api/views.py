from typing import List
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView,
    RetrieveUpdateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
    get_object_or_404,
)
from .mixins import MultipleFieldLookupMixin
from profiles.models import UserFollowing
from posts.models import Post,Category,Comment
from datetime import datetime
from django.contrib.auth import get_user_model
from .permissions import IsAuthorOrSuperUserOrReadOnly,IsUserOrReadOnly
from .serializers import (
    Following_Serializer,
    Post_Serializer,
    Category_Serializer,
    Comment_Serializer,
    Post_post_Serializer,
    Post_Min_Serializer,
)
from posts.pagination import Post_Pagination
# Create your views here.



#post views start
class Posts_List(ListCreateAPIView):
    queryset=Post.objects.created()
    serializer_class = Post_Serializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = Post_Pagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    def post(self, request, *args, **kwargs):

        self.serializer_class=Post_post_Serializer
        return self.create(request, *args, **kwargs)

class Post_detail(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = Post_Serializer
    permission_classes = [IsAuthorOrSuperUserOrReadOnly]


class Post_by_category(ListAPIView):
    serializer_class = Post_Serializer
    pagination_class = Post_Pagination

    def get_queryset(self):
        category_id=self.kwargs.get("category")
        posts=Post.objects.created().filter(category__id=category_id)
        return posts

#post az in tarikh be bad
class Posts_after_date(ListAPIView):
    serializer_class=Post_Serializer
    pagination_class = Post_Pagination

    def get_queryset(self):
        dateparam=self.kwargs.get("date")
        date=datetime.strptime(dateparam,"%Y-%m-%d")
        posts=Post.objects.created().filter(created__date__gte=date)
        return posts


import random
class Random_post(ListAPIView):
    serializer_class=Post_Serializer
    def get_queryset(self):

        posts = list(Post.objects.created())

        # change 3 to how many random items you want
        random_posts = random.sample(posts, 4)
        return random_posts

class Popular_Post(ListAPIView):
    serializer_class=Post_Min_Serializer
    def get_queryset(self):
        posts=Post.objects.order_by("-likes")[0:5]
        return posts

#post views end



#category views start


class Categorys_List(ListAPIView):
    queryset=Category.objects.all()
    serializer_class = Category_Serializer

class Category_Detail(RetrieveAPIView):
    queryset=Category.objects.all()
    serializer_class = Category_Serializer


#category views end




#comment views start


class Comment_List(ListCreateAPIView):
    queryset=Comment.objects.all()
    serializer_class = Comment_Serializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
class Comment_Detail(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = Comment_Serializer
    permission_classes = [IsAuthorOrSuperUserOrReadOnly]

class Comments_Post(ListAPIView):
    serializer_class=Comment_Serializer
    def get_queryset(self):
        post_id=self.kwargs.get("post_id")
        comments=Comment.objects.filter(post__id=post_id)
        return comments
#comment views end

#following view start


class Following(CreateAPIView):
    serializer_class=Following_Serializer
    queryset=UserFollowing.objects.all()
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class Following_Delete(MultipleFieldLookupMixin,RetrieveDestroyAPIView):
    serializer_class=Following_Serializer
    queryset=UserFollowing.objects.all()
    permission_classes=[IsUserOrReadOnly]
    lookup_fields  =  ('user', 'following_user')


#following view end


# profile views start


from .serializers import Profile_Serializer
from profiles.models import Profile
class Profile_View(RetrieveUpdateAPIView):
    serializer_class = Profile_Serializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        user=self.request.user
        return user.profile
        
# profile views end



# user views start
from .serializers import User_Serilizer
class User_View(RetrieveUpdateAPIView):
    serializer_class = User_Serilizer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        user=self.request.user
        return user


from .serializers import User_Serilizer
class User_Username_View(RetrieveAPIView):
    User=get_user_model()
    serializer_class = User_Serilizer
    queryset=User.objects.all()
    lookup_field="username"
    def get_obj(self):
        queryset=self.get_queryset()
        user=get_object_or_404(queryset,username=self.kwargs.get("username"))
        return user


class User_Post(ListAPIView):

    serializer_class=Post_Serializer
    pagination_class = Post_Pagination
    def get_queryset(self):
        username=self.kwargs.get("username")
        User=get_user_model()
        user=User.objects.filter(username=username)
        posts=Post.objects.filter(author__username=username)
        return posts

# user views end



#jwt view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['display_name'] = user.profile.display_name

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer