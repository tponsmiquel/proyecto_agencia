from rest_framework import viewsets, filters
from .models import Client
from .serializers import ClientSerializer

# Create your views here.
class ClientViewSet(viewsets.ModelViewSet):
    """API REST for Client management.
    Allows listing, creating, updating, and deleting records.
    """
    queryset = Client.objects.all().order_by('id')
    serializer_class = ClientSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email', 'document_number']
    ordering_fields = ['id', 'last_name', 'created_at']