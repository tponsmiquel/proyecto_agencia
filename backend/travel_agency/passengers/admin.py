from django.contrib import admin
from .models import Passenger


@admin.register(Passenger)
class PassengerAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'first_name', 'last_name', 'document_type',
        'document_number', 'service', 'email', 'phone', 'created_at'
    )
    search_fields = (
        'first_name',
        'last_name',
        'document_number',
        'service__id',
        'service__dossier__code',
    )
    list_filter = ('document_type', 'is_active')
    ordering = ('last_name', 'first_name')
