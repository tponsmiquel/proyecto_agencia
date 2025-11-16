from rest_framework import viewsets, filters
from .models import Refund
from .serializers import RefundSerializer


class RefundViewSet(viewsets.ModelViewSet):
    """API REST para gestión de reembolsos asociados a pagos."""

    queryset = Refund.objects.all().order_by('-date', '-created_at')
    serializer_class = RefundSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'payment__id',
        'payment__dossier__code',
        'reason',
    ]
    ordering_fields = [
        'amount',
        'date',
    ]
