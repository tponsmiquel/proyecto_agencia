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

        def validate(self, attrs):
            client_type = attrs.get('client_type')
            last_name = attrs.get('last_name')

            if client_type == "company":
                attrs['last_name'] = ""
                return attrs
        
            if client_type == "person" and not last_name:
                raise serializers.ValidationError({"last_name": "Last name is required for person clients."})
            return attrs