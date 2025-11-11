from .models import Client
from rest_framework import serializers


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'id', 'client_type', 'first_name', 'last_name',
            'document_type', 'document_number', 
            'email', 'phone_mobile', 'phone_landline',
            'address', 'city', 'postal_code', 'province', 'country',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']