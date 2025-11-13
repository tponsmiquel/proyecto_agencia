from django.contrib import admin
from .models import Dossier

# Register your models here.
@admin.register(Dossier)
class DossierAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'code', 'title', 'status', 'client', 'start_date', 'end_date', 
        'total_pvp', 'total_paid', 'total_pending', 'total_invoiced', 'created_at'
        )
    search_fields = ('code', 'title', 'client__first_name', 'client__last_name')
    list_filter = ('status', 'is_active')
    ordering = ('-created_at',)