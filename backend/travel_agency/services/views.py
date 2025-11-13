from rest_framework import viewsets, filters
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    """API REST para la gestión de servicios."""

    queryset = Service.objects.all().order_by('start_date')
    serializer_class = ServiceSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'service_type',
        'dossier__code',
        'supplier__name',
        'origin',
        'destination',
        'locator',
        'ticket_number'
    ]
    ordering_fields = ['start_date', 'service_type', 'total_client']
