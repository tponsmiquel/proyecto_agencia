from django.db import models

# Create your models here.
class BaseModel(models.Model):
    """Abstract base model with common fields.
        All other classes will inherit from this class.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True