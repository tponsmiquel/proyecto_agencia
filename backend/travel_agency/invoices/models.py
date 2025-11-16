from django.db import models
from core.models import BaseModel
from dossiers.models import Dossier
from services.models import Service


class Invoice(BaseModel):
    dossier = models.ForeignKey(
        Dossier,
        on_delete=models.CASCADE,
        related_name='invoices'
    )

    code = models.CharField(max_length=50, unique=True)
    issue_date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    is_settled = models.BooleanField(default=False)   # liquidada o no

    class Meta:
        db_table = 'invoices'
        ordering = ['-issue_date']
        indexes = [
            models.Index(fields=['dossier']),
            models.Index(fields=['code']),
        ]

    def __str__(self):
        return f'Invoice {self.code} ({self.total_amount}€)'
    
class InvoiceService(models.Model):
    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name='invoice_services'
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='invoiced_in'
    )

    class Meta:
        db_table = 'invoice_services'
        unique_together = ('invoice', 'service')
        indexes = [
            models.Index(fields=['invoice']),
            models.Index(fields=['service']),
        ]

    def __str__(self):
        return f'{self.invoice.code} → Service {self.service.id}'


