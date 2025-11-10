from django.contrib import admin
from .models import Client

# Register your models here.
@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):    
    list_display = ('id', 'first_name', 'last_name', 'email', 'phone_mobile', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'document_number' ,'phone_mobile')
    list_filter = ('client_type', 'is_active')
    ordering = ('-created_at',)