from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

from apps.players.filters import PlayerFilter
from apps.players.models import Player
from apps.players.permissions import PlayersAccess
from apps.players.serializers import (PlayerListSerializer,
                                      PlayerDetailSerializer)
from apps.tournaments.models import Participant
from core.pagination import CustomPagination

from core.exceptions import APIException400


class PlayerViewset(viewsets.ModelViewSet):
    """
    View managing a playerd CRUD.
    """
    permission_classes = [IsAuthenticated, PlayersAccess]
    lookup_field = 'number'
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PlayerFilter

    def get_queryset(self):
        queryset = Player.objects.filter(
            creator=self.request.user.profile
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return PlayerListSerializer
        else:
            return PlayerDetailSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
        return context

    def destroy(self, request, *args, **kwargs):
        """
        Prevents delete action if the player is involved in at least one
        tournament.
        """
        player = self.get_object()
        participants = [player for player in Participant.objects.filter(
            player=player
        )]
        if participants:
            raise APIException400("This player is participating to at "
                                  "least one tournament.")
        else:
            return super().destroy(request, *args, **kwargs)
