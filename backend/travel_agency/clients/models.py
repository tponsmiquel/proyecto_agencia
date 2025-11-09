from django.db import models
from backend.travel_agency.core.models import BaseModel

# Create your models here.
class Client(BaseModel):
    class ClientType(models.TextChoices):
        PERSON = 'person', 'Person'
        COMPANY = 'company', 'Company'

    class DocumentType(models.TextChoices):
        DNI = 'dni', 'DNI'
        NIE = 'nie', 'NIE'
        PASSPORT = 'passport', 'Passport'

    client_type = models.CharField(max_length=20, choices=ClientType.choices)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    document_type = models.CharField(max_length=20, choices=DocumentType.choices)
    document_number = models.CharField(max_length=50)
    email = models.EmailField(max_length=120, unique=True)

    phone_mobile = models.CharField(max_length=20, blank=True, null=True)
    phone_landline = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = "clients"
        constraints = [
            models.UniqueConstraint(
                fields=["document_type", "document_number"],
                name="uniq_document"
            )
        ]
        indexes = [
            models.Index(fields=["last_name", "first_name"]),
            models.Index(fields=["email"]),
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.client_type})"