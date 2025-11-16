from rest_framework import viewsets, filters
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """API REST para gestión de usuarios internos."""

    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'username',
        'email',
        'full_name'
    ]
    ordering_fields = ['username', 'role']
