from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvoiceViewSet, InvoiceServiceViewSet

router = DefaultRouter()
router.register(r'invoices', InvoiceViewSet, basename='invoice')
router.register(r'invoice-services', InvoiceServiceViewSet, basename='invoice-service')

urlpatterns = [
    path('', include(router.urls)),
]
