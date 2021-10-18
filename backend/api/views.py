from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from posts.models import Post,Category,Comment
from datetime import datetime
from .permissions import IsAuthorOrSuperUserOrReadOnly
from .serializers import Post_Serializer,Category_Serializer,Comment_Serializer
# Create your views here.


class Posts_List(ListCreateAPIView):
    queryset=Post.objects.all()
    serializer_class = Post_Serializer
    permission_classes = [IsAuthenticatedOrReadOnly]


    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class Post_detail(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = Post_Serializer
    permission_classes = [IsAuthorOrSuperUserOrReadOnly]




class Categorys_List(ListAPIView):
    queryset=Category.objects.all()
    serializer_class = Category_Serializer



class Comment_List(ListCreateAPIView):
    queryset=Comment.objects.all()
    serializer_class = Comment_Serializer
    permission_classes = [IsAuthenticatedOrReadOnly]



#post az in tarikh be bad
class Posts_after_date(ListAPIView):
    serializer_class=Post_Serializer
    def get_queryset(self):
        dateparam=self.kwargs.get("date")
        date=datetime.strptime(dateparam,"%Y-%m-%d")
        posts=Post.objects.filter(created__date__gte=date).order_by("-created")
        return posts