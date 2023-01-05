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


