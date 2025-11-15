from django.contrib import admin
from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'file_name', 'file_type', 'service', 'created_at'
    )
    search_fields = (
        'file_name',
        'file_type',
        'service__id',
        'service__dossier__code'
    )
    list_filter = ('file_type', 'is_active')
    ordering = ('-created_at',)
