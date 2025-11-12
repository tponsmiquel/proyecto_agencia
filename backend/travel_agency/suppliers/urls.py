"""
GET    /suppliers/        → lista de proveedores
POST   /suppliers/        → crear proveedor
GET    /suppliers/{id}/   → ver detalle
PUT    /suppliers/{id}/   → actualizar
DELETE /suppliers/{id}/   → eliminar
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet


router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet, basename='supplier')

urlpatterns = [
    path('', include(router.urls)),
]
