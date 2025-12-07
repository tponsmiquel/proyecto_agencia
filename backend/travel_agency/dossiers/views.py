from rest_framework import viewsets, permissions, filters
from .models import Dossier
from .serializers import DossierSerializer

class DossierViewSet(viewsets.ModelViewSet):
    serializer_class = DossierSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['code', 'title', 'client__first_name', 'client__last_name', 'client__email', 'client__document_number']
    ordering_fields = ['created_at', 'start_date', 'end_date']

    def get_queryset(self):
        queryset = Dossier.objects.all().order_by('-created_at')

        code = self.request.query_params.get('code')
        title = self.request.query_params.get('title')
        status = self.request.query_params.get('status')
        client_type = self.request.query_params.get('client_type')
        
        # Filtros individuales
        if code:
            queryset = queryset.filter(code__icontains=code)

        if title:
            queryset = queryset.filter(title__icontains=title)

        if status:
            queryset = queryset.filter(status=status)

        # Filtrar por tipo de cliente
        if client_type and client_type != "all":
            queryset = queryset.filter(client__client_type=client_type)

        return queryset
