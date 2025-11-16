from django.db import models
from core.models import BaseModel


class User(BaseModel):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        AGENT = 'agent', 'Agent'
        MANAGER = 'manager', 'Manager'

    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=120, unique=True)
    full_name = models.CharField(max_length=150)
    role = models.CharField(max_length=50, choices=Role.choices)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'users'
        ordering = ['username']
        indexes = [
            models.Index(fields=['username']),
            models.Index(fields=['email']),
        ]

    def __str__(self):
        return f'{self.full_name} ({self.role})'
