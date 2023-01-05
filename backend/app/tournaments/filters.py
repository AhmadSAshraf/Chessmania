from django_filters import rest_framework as filters

from .models import Tournament


class TournamentFilter(filters.FilterSet):
    sort_by = filters.CharFilter(
        method='filter_sort_by',
    )

    def filter_sort_by(self, queryset, name, value):
        """
        filters by incresing or decreasing order
        """
        values = value.lower().split(',')
        return queryset.order_by(*values)

    class Meta:
        model = Tournament
        fields = [
            'number',
            'name',
            'open',
            'on_going',
            'completed',
            'total_rounds',
            'finished_rounds',
            'tournament_date',
            'date_created',
            'sort_by'
        ]
