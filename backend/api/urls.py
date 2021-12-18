from django.urls import path,include,re_path
from rest_framework_simplejwt import views
from .views import (Posts_List,
    Post_detail,
    Categorys_List,
    Comment_List,
    Posts_after_date,
    Post_by_category,
    Profile_View,
    User_View,
    User_Username_View,
    MyTokenObtainPairView,
    Random_post,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path("posts/",Posts_List.as_view()),
    path("posts/<int:pk>/",Post_detail.as_view()),
    path("posts/random/",Random_post.as_view()),
    path("posts/from/<str:date>/",Posts_after_date.as_view()),
    path("posts/category/<str:category>/",Post_by_category.as_view()),
    path("categorys/",Categorys_List.as_view()),
    path("comments/",Comment_List.as_view()),
    path("profile/",Profile_View.as_view()),
    path("user/me/",User_View.as_view()),
    path("user/<str:username>/",User_Username_View.as_view()),
    path('auth/', include('djoser.urls')),
    re_path(r"^auth/jwt/create/?", MyTokenObtainPairView.as_view(), name="jwt-create"),
    re_path(r"^auth/jwt/refresh/?", views.TokenRefreshView.as_view(), name="jwt-refresh"),
    re_path(r"^auth/jwt/verify/?", views.TokenVerifyView.as_view(), name="jwt-verify"),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
