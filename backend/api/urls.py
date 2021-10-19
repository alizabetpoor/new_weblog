from django.urls import path,include,re_path
from rest_framework_simplejwt import views
from .views import (Posts_List,
    Post_detail,
    Categorys_List,
    Comment_List,
    Posts_after_date,
    Post_by_category,
    MyTokenObtainPairView
)


urlpatterns = [
    path("posts/",Posts_List.as_view()),
    path("posts/<int:pk>/",Post_detail.as_view()),
    path("posts/from/<str:date>/",Posts_after_date.as_view()),
    path("posts/category/<str:category>/",Post_by_category.as_view()),
    path("categorys/",Categorys_List.as_view()),
    path("comments/",Comment_List.as_view()),
    path('auth/', include('djoser.urls')),
    re_path(r"^auth/jwt/create/?", MyTokenObtainPairView.as_view(), name="jwt-create"),
    re_path(r"^auth/jw/refresh/?", views.TokenRefreshView.as_view(), name="jwt-refresh"),
    re_path(r"^auth/jwt/verify/?", views.TokenVerifyView.as_view(), name="jwt-verify"),
]
