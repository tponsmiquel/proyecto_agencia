# Proyecto Agencia de Viajes (DAW)

Aplicación web para la gestión interna de una agencia de viajes.

## 📖 Descripción general
El sistema permite gestionar clientes, expedientes de venta, servicios asociados (vuelos, hoteles, traslados, etc.) y operaciones económicas como cobros, pagos y facturación.

El proyecto está dividido en dos partes:
- **Backend:** desarrollado con Django y Django REST Framework (API REST).
- **Frontend:** desarrollado con Angular (interfaz de usuario).

## ⚙️ Requisitos técnicos
- Python 3.12+
- PostgreSQL 15+
- Node.js 20+ (para el frontend)
- Django 5.x
- Django REST Framework 3.x

## 🚀 Puesta en marcha (entorno local)

1. Activar entorno virtual:
   ```bash
   source backend/venv/bin/activate

2. Iniciar servidor Django:
cd backend/travel_agency
python manage.py runserver

3. Acceder al panel de administración:
http://127.0.0.1:8000/admin