from rest_framework import serializers
from .models import Passenger


class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = [
            'id',
            'title',
            'first_name',
            'last_name',
            'birth_date',
            'phone',
            'email',
            'document_type',
            'document_number',
            'service',
            'is_active',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ('id', 'created_at', 'updated_at')
