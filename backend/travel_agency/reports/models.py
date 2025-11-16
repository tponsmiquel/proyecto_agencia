from django.db import models
from core.models import BaseModel
from users.models import User


class Report(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='reports_created'
    )

    filters = models.JSONField(blank=True, null=True)
    data_snapshot = models.JSONField(blank=True, null=True)

    class Meta:
        db_table = 'reports'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f'{self.name} ({self.created_at.date()})'
