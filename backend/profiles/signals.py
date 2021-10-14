from django.dispatch import receiver
from .models import Profile
from .models import User
from django.db.models.signals import post_save


@receiver(post_save,sender=User)
def create_profile(instance, created,**kwargs):
    if created:
        profile=Profile(user=instance)
        profile.save()