from rest_framework import viewsets, filters
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """API REST para gestión de productos asociados a servicios."""

    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'service__id',
        'supplier__name'
    ]
    ordering_fields = [
        'base_amount',
        'management_fee',
        'total_client',
        'total_supplier'
    ]
