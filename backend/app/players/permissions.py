from rest_framework.permissions import BasePermission


class PlayersAccess(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        if obj.creator == request.user.profile:
            return True
