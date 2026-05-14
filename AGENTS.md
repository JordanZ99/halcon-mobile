<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Arquitectura y Funcionamiento del Proyecto (Halcón Mobile)

## Resumen General
**Halcón Mobile** es una aplicación web responsiva (mobile-first) construida con **Next.js 16** y **Tailwind CSS v4**. Su principal objetivo es proporcionar una interfaz logística dual para:
1. **Clientes**: Rastreo de estado de sus envíos y facturas en tiempo real.
2. **Repartidores**: Gestión y visualización de las entregas asignadas en su ruta.

El proyecto actúa como el *frontend* que se conecta y consume los datos de un backend externo basado en **Laravel** (Halcón ERP).

## Rutas y Flujos de Usuario

### 1. Pantalla de Inicio (`/app/page.tsx`)
- Menú principal de presentación de marca (Halcón Logística).
- Permite al usuario elegir su perfil redirigiéndolo a dos portales diferentes: Portal de Cliente (`/cliente`) o Portal de Repartidor (`/repartidor`).

### 2. Portal de Cliente (`/app/cliente/page.tsx`)
- **Ingreso de datos:** El cliente captura su Número de Factura y Número de Cliente.
- **Comunicación API:** El frontend realiza una solicitud `GET` a la API en producción (`http://halconerp.fwh.is/api/pedidos/...`).
- **Interfaz y Estado:** Muestra una línea de tiempo (Stepper) interactiva del pedido: *Pedido Recibido -> En Proceso -> En Ruta -> Entregado*.
- **Manejo de Errores:** Si el servidor remoto de Laravel no responde, entra en funcionamiento un entorno simulado (*fallback local*) para que la demostración de la UI no se rompa.
- **Evidencia:** Si el paquete figura como entregado, el sistema renderiza una imagen simulada/capturada como evidencia de entrega.

### 3. Portal de Repartidor (`/app/repartidor/page.tsx`)
- **Autenticación:** Inicia con un formulario de login (email y password) conectado a Server Actions (`/app/actions/auth.ts`) o directamente al endpoint `/login` del API. El token se gestiona en el `localStorage`.
- **Panel de control:** Una vez autenticado, el conductor ve un listado de las entregas pendientes para su ruta en el día actual (obtenidas desde `/repartidor/pedidos` en el backend).
- **Detalle de entregas:** Presenta un resumen ágil con facturas, direcciones y estado de los paquetes.

## Base Tecnológica
- **Next.js 16**: Utilizando el enrutador `/app` y directivas como `"use client"` para los componentes con estado.
- **Tailwind CSS 4**: Utilizado para todo el styling estético, aplicando diseños oscuros/claros, sombras (glassmorphism) y colores corporativos (Halcón Dark, Halcón Orange).
- **Lucide React**: Biblioteca de iconos SVG ligeros para representar camiones, paquetes, candados y cascos de obra.
- **Server Actions**: Se incluye lógica del servidor en `/app/actions` para la autenticación y las consultas seguras sin exponer credenciales.
