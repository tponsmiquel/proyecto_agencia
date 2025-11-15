from rest_framework import viewsets, filters
from .models import Payment, PaymentMethod
from .serializers import PaymentSerializer, PaymentMethodSerializer


class PaymentMethodViewSet(viewsets.ModelViewSet):
    """API REST para gestionar métodos de pago (catálogo)."""

    queryset = PaymentMethod.objects.all().order_by('name')
    serializer_class = PaymentMethodSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    """API REST para gestionar pagos asociados a un dossier."""

    queryset = Payment.objects.all().order_by('-date', '-created_at')
    serializer_class = PaymentSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'dossier__code',
        'payment_method__name',
        'concept',
    ]
    ordering_fields = ['amount', 'date', 'status']
