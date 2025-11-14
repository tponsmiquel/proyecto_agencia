from django.db import models
from core.models import BaseModel
from services.models import Service
from suppliers.models import Supplier


class Product(BaseModel):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='products'
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='products'
    )

    base_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    management_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_client = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_supplier = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        db_table = 'products'
        ordering = ['id']
        indexes = [
            models.Index(fields=['service']),
            models.Index(fields=['supplier']),
        ]

    def __str__(self):
        return f'Product for service {self.service_id}'
