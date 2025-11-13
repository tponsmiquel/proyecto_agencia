from django.db import models
from core.models import BaseModel
from dossiers.models import Dossier
from suppliers.models import Supplier


class Service(BaseModel):

    class ServiceType(models.TextChoices):
        FLIGHT = 'flight', 'Flight'
        HOTEL = 'hotel', 'Hotel'
        CRUISE = 'cruise', 'Cruise'
        BUS = 'bus', 'Bus'

    dossier = models.ForeignKey(
        Dossier,
        on_delete=models.CASCADE,
        related_name='services'
    )

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='services'
    )

    service_type = models.CharField(max_length=20, choices=ServiceType.choices)

    booking_date = models.DateField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    departure_date = models.DateField(blank=True, null=True)

    origin = models.CharField(max_length=100, blank=True, null=True)
    destination = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    ticket_number = models.CharField(max_length=100, blank=True, null=True)
    locator = models.CharField(max_length=100, blank=True, null=True)

    total_client = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_supplier = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        db_table = 'services'
        ordering = ['start_date']
        indexes = [
            models.Index(fields=['service_type']),
            models.Index(fields=['dossier']),
        ]

    def __str__(self):
        return f'{self.service_type} - {self.dossier.code}'