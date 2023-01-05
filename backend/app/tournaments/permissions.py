from rest_framework.permissions import BasePermission


class TournamentAccess(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        if obj.creator == request.user.profile:
            return True


class RoundAccess(BasePermission):
    def has_permission(self, request, view):
        if view.tournament.creator == request.user.profile:
            return True

    def has_object_permission(self, request, view, obj):
        if obj.tournament.creator == request.user.profile:
            return True


class MatchAccess(BasePermission):
    def has_permission(self, request, view):
        if view.tournament.creator == request.user.profile:
            return True

    def has_object_permission(self, request, view, obj):
        if obj.tournament.creator == request.user.profile:
            return True


class ParticipantAccess(BasePermission):
    def has_permission(self, request, view):
        if view.tournament.creator == request.user.profile:
            return True

    def has_object_permission(self, request, view, obj):
        if obj.tournament.creator == request.user.profile:
            return True
