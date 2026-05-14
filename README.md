# Halcon Mobile - Frontend ERP Logístico

Halcon es un sistema ERP de gestión logística integral para operaciones de cumplimiento de pedidos y entregas. Este repositorio (o directorio) contiene el **frontend mobile-first** desarrollado con Next.js.

El backend (API REST) se encuentra desarrollado en Laravel 12.

## Arquitectura y Tecnologías

- **Framework**: Next.js 16.2.4 (App Router)
- **Librería UI**: React 19.2.4
- **Lenguaje**: TypeScript 5.x
- **Estilos**: TailwindCSS 4.x
- **Iconos**: Lucide React

## Características Principales

- **Portal de Cliente**: Seguimiento de pedidos públicos (con número de factura y cliente).
- **Portal de Repartidor**: Gestión de entregas, captura de evidencias fotográficas, actualización de estados de pedidos.
- **Diseño Mobile-First**: Interfaz optimizada para dispositivos móviles orientada a repartidores en ruta.
- **Comunicación Segura**: Conexión con backend Laravel protegido mediante Laravel Sanctum.

## Requisitos Previos

- Node.js (v20 o superior recomendado)
- Backend de Halcon ERP ejecutándose

## Configuración del Entorno

1. Copia el archivo de variables de entorno de ejemplo:
   ```bash
   cp .env.example .env.local
   ```
2. Edita `.env.local` y asegúrate de que la URL apunte a tu API backend (ej. `http://localhost:8000/api` o tu entorno de producción).

## Instalación y Ejecución

Para instalar las dependencias:
```bash
npm install
```

Para correr el servidor de desarrollo:
```bash
npm run dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura de Rutas

- `/`: Selección de perfil (Cliente o Repartidor).
- `/cliente`: Seguimiento de pedidos del cliente.
- `/repartidor`: Gestión de entregas del conductor.
- `/repartidor/entrega/[id]`: Detalles de una entrega específica.
