from rest_framework import viewsets, filters
from .models import Passenger
from .serializers import PassengerSerializer


class PassengerViewSet(viewsets.ModelViewSet):
    """API REST para gestión de pasajeros."""

    queryset = Passenger.objects.all().order_by('last_name', 'first_name')
    serializer_class = PassengerSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'first_name',
        'last_name',
        'document_number',
        'service__id',
        'service__dossier__code'
    ]
    ordering_fields = [
        'last_name',
        'first_name',
        'birth_date',
    ]
