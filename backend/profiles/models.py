from django.db import models
import re
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser
# Create your models here.

def validate_phonenumber(phonenumber):
    pattern=re.compile(r"^(\+98|0)?9\d{9}$")
    if not re.fullmatch(pattern,phonenumber):
        raise ValidationError(('phone number is not correct'),params={'phonenumber':phonenumber})


class User(AbstractUser):
    email=models.EmailField(unique=True,null=False,verbose_name="ایمیل")
    REQUIRED_FIELDS = ['email']
    def __str__(self) -> str:
        return f"{self.username}"

class Profile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="profile")
    display_name=models.CharField(max_length=100,null=True,blank=True)
    birthday=models.DateField(null=True,blank=True)
    phonenumber=models.CharField(max_length=13,unique=True,null=True,blank=True,validators=[validate_phonenumber])
    phone_verify=models.BooleanField(default=False,verbose_name="وریفای ایمیل")
    email_verify=models.BooleanField(default=False,verbose_name="وریفای شماره")