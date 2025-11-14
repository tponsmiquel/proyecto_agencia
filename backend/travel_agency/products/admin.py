from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'service', 'supplier', 'base_amount', 
        'management_fee', 'total_client', 'total_supplier', 'created_at'
    )
    search_fields = ('service__id', 'supplier__name')
    list_filter = ('supplier', 'is_active')
    ordering = ('id',)
