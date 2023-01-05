from rest_framework import serializers
from core.exceptions import APIException400

from apps.tournaments.models import Tournament, Participant, Round, Match


class TournamentListSerializer(serializers.ModelSerializer):
    """
    Only used for 'list' action. A tounrmanent item contains less info than a
    tournament from the detailed serializer
    """
    class Meta:
        model = Tournament
        fields = (
            'number',
            'name',
            'open',
            'on_going',
            'completed',
            'players_list',
            'total_rounds',
            'finished_rounds',
            'tournament_date',
            'date_created'
        )


class TournamentDetailSerializer(TournamentListSerializer):
    """
    Displays more fields than the list serializer. Also has a 'ranking' field,
    where participants are sorted depending on the total_points and rank, and
    a place is attributed to each participant.
    """
    ranking = serializers.SerializerMethodField()

    class Meta:
        model = Tournament
        fields = (
            'number',
            'name',
            'open',
            'on_going',
            'completed',
            'players_list',
            'total_rounds',
            'finished_rounds',
            'tournament_date',
            'date_created',
            'ranking',
            'locked',
        )
        extra_kwargs = {
            'locked': {
                'write_only': True
            }
        }

    @staticmethod
    def get_ranking(instance):
        if instance.locked:
            ranking = list()
            sorted_participants = instance.sort_participants()
            for place, participant in enumerate(sorted_participants, 1):
                ranking.append(
                    {
                        "place": place,
                        "participant": participant.player.username,
                        "total points": participant.total_points,
                        "rank": participant.rank
                    }
                )
            return ranking
        else:
            return "This tournament is not started."

    def create(self, validated_data):
        """
        Custom create method where the request user's profile is extracted from
        the view's context and added as the "creator" field.
        """
        creator = self.context['profile']

        if 'players_list' in validated_data.keys():
            tournament = Tournament.objects.create(
                creator=creator,
                name=validated_data['name'],
                players_list=validated_data['players_list'],
                tournament_date=validated_data['tournament_date'],
                locked=validated_data['locked']
            )
        else:
            tournament = Tournament.objects.create(
                creator=creator,
                name=validated_data['name'],
                tournament_date=validated_data['tournament_date'],
                locked=validated_data['locked']
            )
        return tournament

    def update(self, instance, validated_data):
        """
        Custom update method conditioning method access to the locked status of
         a tournament.
        """
        if instance.locked:
            raise APIException400("A locked tournament cannot be modified.")
        else:
            return super().update(instance, validated_data)


class RoundListSerializer(serializers.ModelSerializer):
    """
    Only used for 'list' action.
    """
    versus = serializers.SerializerMethodField()

    class Meta:
        model = Round
        fields = (
            'number',
            'finished_matches',
            'versus'
        )

    @staticmethod
    def get_versus(instance):
        """
        Creates a list of usernames participants pairs
        """
        versus_list = list()
        for pairs in instance.participants_pairs:
            participant_1 = Participant.objects.get(
                number=pairs[0],
                tournament=instance.tournament
            )
            participant_2 = Participant.objects.get(
                number=pairs[1],
                tournament=instance.tournament
            )
            versus_list.append(
                [
                    participant_1.player.username,
                    participant_2.player.username
                ]
            )
        return versus_list


class RoundDetailSerializer(serializers.ModelSerializer):
    """
    Used for all actions except 'list' action.
    """
    matches = serializers.SerializerMethodField()

    class Meta:
        model = Round
        fields = (
            'number',
            'finished_matches',
            'matches'
        )

    @staticmethod
    def get_matches(instance):
        """
        Displays a list of matches containing dictionaries with all info
        regarding a match.
        """
        matches = list()
        matches_list = [
            match for match in
            instance.match_set.all().order_by('number')
        ]
        for match in matches_list:
            participant_1 = Participant.objects.get(
                number=match.number_participant_1,
                tournament=instance.tournament
            )
            participant_2 = Participant.objects.get(
                number=match.number_participant_2,
                tournament=instance.tournament
            )
            matches.append(
                {
                    "number": match.number,
                    "played": match.played,
                    "participant_1": {
                        "username": participant_1.player.username,
                        "point": match.result_participant_1
                    },
                    "participant_2": {
                        "username": participant_2.player.username,
                        "point": match.result_participant_2
                    }
                }
            )
        return matches


class MatchListSerializer(serializers.ModelSerializer):
    """
    Only used for 'list' action.
    """
    class Meta:
        model = Match
        fields = (
            'number',
            'played'
        )


class MatchDetailSerializer(serializers.ModelSerializer):
    """
    Used for all actions except 'list' action.
    """

    class Meta:
        model = Match
        fields = (
            'number',
            'played',
            'number_participant_1',
            'result_participant_1',
            'number_participant_2',
            'result_participant_2'
        )

    def update(self, instance, validated_data):
        """
        Custom update method conditioning method access to the played status of
        a match.
        """
        if instance.played:
            raise APIException400("A played match cannot be modified.")
        else:
            return super().update(instance, validated_data)


class ParticipantListSerializer(serializers.ModelSerializer):
    """
     Only used for "list" action. Has methods linking participant to some
     corresponding player attributes.
    """
    tournament_number = serializers.SerializerMethodField()
    player_number = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = (
            'number',
            'tournament_number',
            'player_number',
            'rank'
        )

    @staticmethod
    def get_tournament_number(instance):
        return instance.tournament.number

    @staticmethod
    def get_player_number(instance):
        return instance.player.number


class ParticipantDetailSerializer(ParticipantListSerializer):
    """
    Used for all actions except 'list' action. Has more methods than the list
    serializer, inking the participant to some corresponding player attributes.
    """
    username = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = (
            'number',
            'tournament_number',
            'player_number',
            'username',
            'last_name',
            'first_name',
            'total_points',
            'rank'
        )

    @staticmethod
    def get_username(instance):
        return instance.player.username

    @staticmethod
    def get_last_name(instance):
        return instance.player.last_name

    @staticmethod
    def get_first_name(instance):
        return instance.player.first_name