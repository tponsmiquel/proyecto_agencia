from rest_framework import serializers
from .models import Invoice, InvoiceService


class InvoiceServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceService
        fields = [
            'id',
            'invoice',
            'service'
        ]
        read_only_fields = ('id',)


class InvoiceSerializer(serializers.ModelSerializer):
    invoice_services = InvoiceServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = [
            'id',
            'dossier',
            'code',
            'issue_date',
            'total_amount',
            'is_settled',
            'invoice_services',
            'is_active',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ('id', 'created_at', 'updated_at')
