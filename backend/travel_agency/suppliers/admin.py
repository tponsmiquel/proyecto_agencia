from django.contrib import admin
from .models import Supplier

# Register your models here.
@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone', 'is_active','created_at')
    search_fields = ('name', 'email')
    list_filter = ('is_active',)
    ordering = ('name',)
