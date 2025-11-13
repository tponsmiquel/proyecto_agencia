from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'service_type', 'dossier', 'supplier',
        'start_date', 'origin', 'destination',
        'total_client', 'total_supplier',
        'created_at'
    )
    search_fields = (
        'service_type',
        'dossier__code',
        'supplier__name',
        'origin',
        'destination'
    )
    list_filter = ('service_type', 'is_active')
    ordering = ('start_date',)
