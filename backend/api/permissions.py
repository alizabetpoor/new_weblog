from rest_framework.permissions import BasePermission,SAFE_METHODS


class IsAuthorOrSuperUserOrReadOnly(BasePermission):


    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return bool(
            #get access to the author
            request.user.is_authenticated and obj.author==request.user or
            #get access to the superuser
            request.user.is_authenticated and request.user.is_superuser)
            