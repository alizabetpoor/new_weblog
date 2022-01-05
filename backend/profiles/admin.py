from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile,User,UserFollowing
# Register your models here.

class Profile_Admin(admin.ModelAdmin):
    list_display=("user","display_name","birthday","phonenumber",)


class Following_Admin(admin.ModelAdmin):
    list_display=("user","following_user","created")



UserAdmin.add_fieldsets[0][1]["fields"]=("email",'username',
                                        'password1', 'password2')

UserAdmin.list_display = ('username', 'email', 'first_name',
                         'last_name','is_staff')




admin.site.register(User,UserAdmin)

admin.site.register(Profile,Profile_Admin)

admin.site.register(UserFollowing,Following_Admin)