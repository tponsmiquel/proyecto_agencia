from rest_framework import viewsets, filters
from .models import Document
from .serializers import DocumentSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    """API REST para gestión de documentos asociados a servicios."""

    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'file_name',
        'file_type',
        'service__id',
        'service__dossier__code'
    ]
    ordering_fields = [
        'file_name',
        'file_type',
        'created_at'
    ]
