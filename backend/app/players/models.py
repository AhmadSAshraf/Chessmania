from django.db import models
from core.exceptions import APIException400

from apps.user_profiles.models import Profile


class Player(models.Model):
    """
    Player object involved in chess tournament. Can be registered in tournament
    players_list field. Tournament participant objects are built on them.
    """
    creator = models.ForeignKey(
        to=Profile,
        on_delete=models.CASCADE,
        blank=False,
        null=True
    )
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    username = models.CharField(
        max_length=50,
        blank=False,
        null=False,
    )
    last_name = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )
    first_name = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )
    rank = models.IntegerField(
        editable=False,
        blank=True,
        null=True,
    )
    tournaments_played = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    tournaments_won = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    matches_played = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    matches_won = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    avg_place = models.FloatField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )
    date_created = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Player'

    def __str__(self):
        return self.username

    def check_player_number_and_rank(self):
        """
        Increases creator players_created field by 1 and set the new player
        rank.
        """
        self.creator.players_created += 1
        self.creator.save()
        self.number = self.creator.players_created
        self.rank = self.creator.players_created

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        """
        Custom save executing custom methods if player is new.
        """
        if not self.number and not self.rank:
            self.check_username_field_uniqueness()
            self.check_player_number_and_rank()
        super().save()

    def calcultate_new_average_place(self, place):
        """
        Calculates player tournaments average place by taking into account the
        number of tournaments played, the current average place and the newly
        place obtained at the last tournament.
        """
        if not self.avg_place:
            self.avg_place = place
        else:
            places_sum = self.avg_place * self.tournaments_played
            places_sum += place
            avg_place = places_sum / (self.tournaments_played + 1)
            self.avg_place = round(avg_place, 2)

    def check_username_field_uniqueness(self):
        """
        Checks in the DB if the username given is free.
        """
        usernames = [
            player.username for player
            in Player.objects.filter(creator=self.creator)
        ]
        if self.username in usernames:
            raise APIException400('This username is already used.')
