from django.db import models
from core.models import BaseModel
from payments.models import Payment


class Refund(BaseModel):
    payment = models.ForeignKey(
        Payment,
        on_delete=models.CASCADE,
        related_name='refunds'
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    reason = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'refunds'
        ordering = ['-date', '-created_at']
        indexes = [
            models.Index(fields=['payment']),
            models.Index(fields=['date']),
        ]

    def __str__(self):
        return f'Refund {self.amount}€ - Payment #{self.payment.id}'
