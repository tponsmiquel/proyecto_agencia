from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id',
            'dossier',
            'supplier',
            'service_type',
            'booking_date',
            'start_date',
            'departure_date',
            'origin',
            'destination',
            'description',
            'ticket_number',
            'locator',
            'total_client',
            'total_supplier',
            'is_active',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ('id', 'created_at', 'updated_at')
