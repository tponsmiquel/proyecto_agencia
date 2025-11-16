from rest_framework import viewsets, filters
from .models import Report
from .serializers import ReportSerializer


class ReportViewSet(viewsets.ModelViewSet):
    """API REST para gestión de informes generados."""

    queryset = Report.objects.all().order_by('-created_at')
    serializer_class = ReportSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'name',
        'description',
        'created_by__username',
        'created_by__full_name'
    ]
    ordering_fields = ['created_at', 'name']
