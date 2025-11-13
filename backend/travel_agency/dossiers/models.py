from django.db import models
from core.models import BaseModel

# Create your models here.
class Dossier(BaseModel):
    class Status(models.TextChoices):
        OPEN = 'open', 'Open'
        CLOSED = 'closed', 'Closed'

    code = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OPEN)

    client = models.ForeignKey('clients.Client', on_delete=models.CASCADE, related_name='dossiers')

    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    total_pvp = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_pending = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_invoiced = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        db_table = "dossiers"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['status']),
            models.Index(fields=['client']),
        ]

    def __str__(self):
        return f"{self.code} - {self.client.first_name} - {self.client.last_name}"