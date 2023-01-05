from rest_framework import viewsets
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

from apps.tournaments.filters import TournamentFilter
from apps.tournaments.models import (Tournament,
                                     Participant,
                                     Round,
                                     Match)
from apps.tournaments.permissions import (TournamentAccess,
                                          ParticipantAccess,
                                          RoundAccess,
                                          MatchAccess)
from apps.tournaments.serializers import (TournamentListSerializer,
                                          TournamentDetailSerializer,
                                          RoundListSerializer,
                                          RoundDetailSerializer,
                                          MatchListSerializer,
                                          MatchDetailSerializer,
                                          ParticipantListSerializer,
                                          ParticipantDetailSerializer)
from core.pagination import CustomPagination
from core.exceptions import APIException404


class ChessBaseViewset(viewsets.ModelViewSet):
    """
    Base viewset used for all views instead tournament root view.
    """
    tournament = None
    round_obj = None

    def get_tournament(self):
        """
        Try to get a tournament object based on tournament_number in kwargs and
         return it.
        """
        tournament_number = self.kwargs['tournament_number']
        try:
            tournament = Tournament.objects.get(
                creator=self.request.user.profile,
                number=tournament_number
            )
        except ObjectDoesNotExist:
            raise APIException404("Tournament does not exist.")
        return tournament

    def get_round(self):
        """
        Try to get a round object based on round_number in kwargs and
        return it.
        """
        round_number = self.kwargs['round_number']
        try:
            round_obj = Round.objects.get(
                tournament=self.tournament,
                number=round_number
            )
        except ObjectDoesNotExist:
            raise APIException404("Round does not exist.")
        return round_obj

class TournamentViewset(viewsets.ModelViewSet):
    """
    View managing tournament CRUD.
    """
    permission_classes = [IsAuthenticated, TournamentAccess]
    lookup_field = 'number'
    pagination_class = CustomPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = TournamentFilter

    def get_queryset(self):
        queryset = Tournament.objects.filter(
            creator=self.request.user.profile
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return TournamentListSerializer
        else:
            return TournamentDetailSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['profile'] = self.request.user.profile
        return context

class RoundViewset(ChessBaseViewset):
    """
    View managing round CRUD. Only 'read' is allowed.
    """
    http_method_names = ['get', 'head', 'options', 'trace']
    permission_classes = [IsAuthenticated, RoundAccess]
    lookup_field = 'number'

    def initial(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.tournament = self.get_tournament()
        super().initial(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Round.objects.filter(
            tournament=self.tournament
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return RoundListSerializer
        else:
            return RoundDetailSerializer
class MatchViewset(ChessBaseViewset):
    """
    View managing match CRUD.
    """
    http_method_names = ['get', 'put', 'patch', 'head', 'options', 'trace']
    permission_classes = [IsAuthenticated, MatchAccess]
    lookup_field = 'number'

    def initial(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.tournament = self.get_tournament()
            self.round_obj = self.get_round()
        super().initial(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Match.objects.filter(
            tournament=self.tournament,
            round=self.round_obj
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return MatchListSerializer
        else:
            return MatchDetailSerializer


class ParticipantViewset(ChessBaseViewset):
    """
    View managing participant CRUD. Only 'read' is allowed.
    """
    http_method_names = ['get', 'head', 'options', 'trace']
    permission_classes = [IsAuthenticated, ParticipantAccess]
    lookup_field = 'number'

    def initial(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            self.tournament = self.get_tournament()
        super().initial(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Participant.objects.filter(
            tournament=self.tournament
        ).order_by('number')
        return queryset

    def get_serializer_class(self):
        if self.action == 'list':
            return ParticipantListSerializer
        else:
            return ParticipantDetailSerializer