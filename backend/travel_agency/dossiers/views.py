from rest_framework import viewsets, permissions, filters
from .models import Dossier
from .serializers import DossierSerializer

class DossierViewSet(viewsets.ModelViewSet):
    queryset = Dossier.objects.all().order_by('-created_at')
    serializer_class = DossierSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['code', 'title', 'client__first_name', 'client__last_name']
    ordering_fields = ['created_at', 'start_date', 'end_date']

    def get_queryset(self):
        queryset = super().get_queryset()

        client_id = self.request.query_params.get('client')
        if client_id:
            queryset = queryset.filter(client_id=client_id)

        return queryset