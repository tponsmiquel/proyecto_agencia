from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'full_name', 'email', 'role',
        'is_active', 'created_at'
    )
    search_fields = (
        'username',
        'email',
        'full_name',
    )
    list_filter = ('role', 'is_active')
    ordering = ('username',)
