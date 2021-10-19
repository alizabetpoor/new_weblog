from django.urls import path
from .views import (Posts_List,
    Post_detail,
    Categorys_List,
    Comment_List,
    Posts_after_date,
    Post_by_category
)


urlpatterns = [
    path("posts/",Posts_List.as_view()),
    path("posts/<int:pk>/",Post_detail.as_view()),
    path("posts/from/<str:date>/",Posts_after_date.as_view()),
    path("posts/category/<str:category>/",Post_by_category.as_view()),
    path("categorys/",Categorys_List.as_view()),
    path("comments/",Comment_List.as_view()),
]
