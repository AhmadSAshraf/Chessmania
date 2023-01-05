from django.contrib import admin

from apps.tournaments.models import Tournament, Participant, Round, Match


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = (
        'number',
        'name',
        'creator',
        'finished_rounds',
        'open',
        'on_going',
        'completed',
        'tournament_date'
    )


@admin.register(Round)
class RoundAdmin(admin.ModelAdmin):
    list_display = (
        'tournament',
        'number',
        'finished_matches',
        'participants_pairs'
    )


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        'tournament',
        'round',
        'number',
        'played',
        'number_participant_1',
        'result_participant_1',
        'number_participant_2',
        'result_participant_2',
    )


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = (
        'number',
        'tournament',
        'player',
        'total_points',
        'rank'
    )
