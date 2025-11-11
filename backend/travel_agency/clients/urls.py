""" 
GET     /clients/        → lista de clientes
POST    /clients/        → crear cliente
GET     /clients/{id}/   → ver detalle
PUT     /clients/{id}/   → actualizar
DELETE  /clients/{id}/   → eliminar  
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet

router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='client')

urlpatterns = [
    path('', include(router.urls)),
]

