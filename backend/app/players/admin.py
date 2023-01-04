from django.contrib import admin
from .models import Player


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = (
        'number',
        'username',
        'creator',
        'first_name',
        'last_name',
        'rank',
        'avg_place',
        'date_created',
    )
