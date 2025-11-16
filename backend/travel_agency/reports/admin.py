from django.contrib import admin
from .models import Report


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'created_by',
        'created_at',
        'is_active'
    )
    search_fields = (
        'name',
        'description',
        'created_by__username',
        'created_by__full_name'
    )
    list_filter = ('created_by', 'created_at', 'is_active')
    ordering = ('-created_at',)
