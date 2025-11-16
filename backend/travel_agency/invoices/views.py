from rest_framework import viewsets, filters
from .models import Invoice, InvoiceService
from .serializers import InvoiceSerializer, InvoiceServiceSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    """API REST para gestión de facturas."""

    queryset = Invoice.objects.all().order_by('-issue_date')
    serializer_class = InvoiceSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'code',
        'dossier__code'
    ]
    ordering_fields = [
        'issue_date',
        'total_amount'
    ]


class InvoiceServiceViewSet(viewsets.ModelViewSet):
    """API REST para asociar servicios a una factura."""

    queryset = InvoiceService.objects.all()
    serializer_class = InvoiceServiceSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = [
        'invoice__code',
        'service__id'
    ]
