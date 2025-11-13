from rest_framework import serializers
from .models import Dossier

class DossierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dossier
        fields = [
            'id', 'code', 'title', 'status', 'client',
            'start_date', 'end_date',
            'total_pvp', 'total_paid', 'total_pending', 'total_invoiced',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']