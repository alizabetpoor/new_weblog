from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post,Like


#create like object of post after creating post
@receiver(post_save,sender=Post)
def create_like(sender, instance, created, **kwargs):
    if created:
        like=Like(post=instance,users=None)
        like.save()
