from django_filters import rest_framework as filters

from .models import Player


class PlayerFilter(filters.FilterSet):
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
        model = Player
        fields = [
            'number',
            'username',
            'last_name',
            'first_name',
            'date_created',
            'rank',
            'sort_by'
        ]
