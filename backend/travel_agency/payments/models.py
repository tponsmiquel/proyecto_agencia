from django.db import models
from core.models import BaseModel
from dossiers.models import Dossier


class PaymentMethod(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'payment_methods'
        ordering = ['name']

    def __str__(self):
        return self.name


class Payment(BaseModel):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        COMPLETED = 'completed', 'Completed'
        CANCELLED = 'cancelled', 'Cancelled'

    dossier = models.ForeignKey(
        Dossier,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    payment_method = models.ForeignKey(
        PaymentMethod,
        on_delete=models.SET_NULL,
        null=True,
        related_name='payments'
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    concept = models.CharField(max_length=200, blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.COMPLETED)

    class Meta:
        db_table = 'payments'
        ordering = ['-date', '-created_at']
        indexes = [
            models.Index(fields=['dossier']),
            models.Index(fields=['payment_method']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f'{self.amount}€ [{self.status}]'
