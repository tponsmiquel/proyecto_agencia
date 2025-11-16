from django.contrib import admin
from .models import Refund


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'payment', 'amount', 'date', 'created_at'
    )
    search_fields = (
        'payment__id',
        'payment__dossier__code',
        'reason'
    )
    list_filter = ('date',)
    ordering = ('-date',)
