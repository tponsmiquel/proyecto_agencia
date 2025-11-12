from django.db import models
from core.models import BaseModel

# Create your models here.
class  Supplier(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=120, unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'suppliers'
        ordering = ['name']
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['email']),
        ]

    def __str__(self):
        return self.name