from django.db import models
import re
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
# Create your models here.

def validate_phonenumber(phonenumber):
    pattern=re.compile(r"^(\+98|0)?9\d{9}$")
    if not re.fullmatch(pattern,phonenumber):
        raise ValidationError(('phone number is not correct'),params={'phonenumber':phonenumber})


class Profile(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="profile")
    display_name=models.CharField(max_length=100,null=True,blank=True)
    birthday=models.DateField(null=True,blank=True)
    phonenumber=models.CharField(max_length=13,unique=True,null=True,blank=True,validators=[validate_phonenumber])
