from django.db import models
from core.models import BaseModel
from services.models import Service


class Passenger(BaseModel):

    class DocumentType(models.TextChoices):
        DNI = 'dni', 'DNI'
        NIE = 'nie', 'NIE'
        PASSPORT = 'passport', 'Passport'

    title = models.CharField(max_length=10, blank=True, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField(blank=True, null=True)

    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=120, blank=True, null=True)

    document_type = models.CharField(max_length=20, choices=DocumentType.choices, blank=True, null=True)
    document_number = models.CharField(max_length=50, blank=True, null=True)

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='passengers'
    )

    class Meta:
        db_table = 'passengers'
        ordering = ['last_name', 'first_name']
        indexes = [
            models.Index(fields=['last_name', 'first_name']),
            models.Index(fields=['document_number']),
        ]

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
