from django.db import models
from core.models import BaseModel
from services.models import Service


class Document(BaseModel):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='documents'
    )

    file_name = models.CharField(max_length=200)
    file_type = models.CharField(max_length=50, blank=True, null=True)
    file_url = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'documents'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['service']),
            models.Index(fields=['file_name']),
        ]

    def __str__(self):
        return self.file_name
