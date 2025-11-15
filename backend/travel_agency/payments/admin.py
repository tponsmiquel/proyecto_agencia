from django.contrib import admin
from .models import PaymentMethod, Payment


@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'dossier', 'payment_method', 'amount',
        'date', 'status', 'created_at'
    )
    search_fields = (
        'dossier__code',
        'payment_method__name',
        'concept'
    )
    list_filter = ('status', 'payment_method')
    ordering = ('-date',)
