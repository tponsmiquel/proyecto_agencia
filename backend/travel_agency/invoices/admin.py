from django.contrib import admin
from .models import Invoice, InvoiceService


class InvoiceServiceInline(admin.TabularInline):
    model = InvoiceService
    extra = 1
    autocomplete_fields = ('service',)


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'code', 'dossier', 'issue_date',
        'total_amount', 'is_settled', 'created_at'
    )
    search_fields = (
        'code',
        'dossier__code',
    )
    list_filter = ('is_settled', 'issue_date')
    ordering = ('-issue_date',)

    inlines = [InvoiceServiceInline]


@admin.register(InvoiceService)
class InvoiceServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'invoice', 'service')
    search_fields = (
        'invoice__code',
        'service__id',
        'service__description',
    )
    list_filter = ('invoice',)
    ordering = ('invoice',)
