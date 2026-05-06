# Reporte Técnico: Conexión Segura entre Next.js y Laravel (Oracle Cloud)

Este documento detalla el proceso paso a paso realizado para conectar de forma segura una aplicación frontend (Next.js) con una API backend (Laravel alojado en Oracle Cloud), cumpliendo con estándares estrictos de ciberseguridad.

---

## 0. Preparación Inicial y Primer Intento de Conexión

### Definición de Variables de Entorno
El primer paso fue configurar la URL base de la API en el archivo `.env.local` del proyecto Next.js. Esto permite que la aplicación sepa a dónde dirigir las peticiones sin hardcodear URLs en el código.

```env
NEXT_PUBLIC_API_URL=https://halconerp.crzr.org/api
```

### Implementación Directa (Lógica Inicial)
Se modificaron los componentes de la aplicación (`RepartidorPage` y `EntregaPage`) para manejar la lógica de negocio básica:
1. **Login**: Captura de credenciales y envío mediante `fetch` al endpoint `/login`.
2. **Persistencia**: Almacenamiento inicial del token recibido en `localStorage` (método que luego fue mejorado por seguridad).
3. **Consumo de Datos**: Implementación de funciones para listar pedidos enviando el token en la cabecera `Authorization: Bearer <token>`.
4. **Subida de Evidencia**: Uso del objeto `FormData` en Javascript para el envío de imágenes (evidencia fotográfica), asegurando que el navegador configure correctamente los "boundaries" del archivo.

---

## 1. Problema Inicial: CORS y el Error 419 (Page Expired)

### ¿Qué se hizo?
Al intentar conectar la aplicación React/Next.js desde nuestro entorno de desarrollo (`localhost:3000`) hacia la API en producción (`https://halconerp.crzr.org/api`), el navegador bloqueó la petición debido a la política **CORS (Cross-Origin Resource Sharing)**. 

Para intentar solucionar esto localmente sin tocar el servidor, implementamos primero un **Proxy (Rewrites)** en `next.config.ts`. Si bien esto permitió que la petición llegara al servidor, reveló un segundo obstáculo: el error HTTP **419 Page Expired**.

### ¿Por qué y Cómo se resolvió?
Este diagnóstico fue clave para entender que el problema no era solo de permisos de dominio, sino de la arquitectura de autenticación del backend:

* **CORS:** El backend solo permitía peticiones desde el dominio de producción. Lo resolvimos editando el archivo `config/cors.php` en Laravel, agregando explícitamente `'http://localhost:3000'` a la lista de orígenes permitidos.
* **Error 419 (CSRF):** Descubrimos que Laravel Sanctum estaba tratando a `localhost:3000` como un "dominio con estado" (Stateful Domain). Esto obligaba a la API a exigir un token CSRF (propio de aplicaciones web tradicionales) en lugar de aceptar el Bearer Token. **La solución definitiva fue vaciar la variable `SANCTUM_STATEFUL_DOMAINS=` en el `.env` de Laravel** y eliminar el Proxy de Next.js, permitiendo una conexión directa y limpia.

---

## 2. Elevando el Estándar de Seguridad: Prevención de XSS

### ¿Qué se hizo?
La primera idea fue realizar las peticiones a la API directamente desde los "Client Components" de React (navegador) y guardar el Token de Acceso que nos daba Laravel dentro del `localStorage` del navegador. **Esta práctica fue descartada por ser insegura.**

### ¿Por qué?
Guardar tokens sensibles en `localStorage` o `sessionStorage` expone la aplicación a ataques **XSS (Cross-Site Scripting)**. Si un atacante logra inyectar código JavaScript malicioso en la página web, ese código puede leer el `localStorage`, robar el token del usuario y secuestrar su sesión.

### ¿Cómo lo resolvimos?
Implementamos el patrón arquitectónico **BFF (Backend-For-Frontend)** utilizando las **Server Actions** nativas de Next.js. Este patrón divide la responsabilidad:
1. El navegador (Frontend) nunca toca el token de seguridad.
2. El servidor de Node.js (Next.js) actúa como un intermediario seguro entre el navegador y la API de Laravel.

---

## 3. Implementación del Patrón BFF con Cookies `HttpOnly`

### A. Módulo de Autenticación (`app/actions/auth.ts`)
Creamos una función que se ejecuta **exclusivamente en el servidor de Next.js**. 
* Recibe el usuario y contraseña del formulario.
* Hace una petición POST a la API de Laravel para obtener el Token.
* En lugar de devolver el Token al navegador, **el servidor de Next.js guarda el token en una Cookie `HttpOnly` y `Secure`**.
* *Las cookies `HttpOnly` son un mecanismo de seguridad del navegador que impide estrictamente que el código JavaScript pueda leer su contenido, neutralizando por completo el robo de tokens por XSS.*

### B. Módulo de Peticiones y Subida de Archivos (`app/actions/orders.ts`)
Para obtener los pedidos o enviar actualizaciones (como la foto de evidencia de entrega usando `FormData`), creamos acciones de servidor.
* La Server Action recibe la petición del navegador.
* Extrae la cookie `HttpOnly` de forma segura en el backend de Node.js.
* Construye la petición hacia Laravel inyectando la cabecera `Authorization: Bearer <token>`.
* Devuelve al navegador únicamente la información ya procesada (JSON).

### C. Refactorización de Componentes React (`page.tsx`)
Finalmente, eliminamos todas las referencias y usos de `localStorage` y de la función `fetch()` en los archivos del cliente (React). Sustituimos la lógica para que los botones y formularios simplemente invoquen las funciones de servidor (`loginAction`, `fetchOrdersAction`, `updateOrderStatusAction`).

---

## Conclusión
La arquitectura final implementada garantiza:
1. **Comunicación limpia:** Sin bloqueos CORS ni conflictos de middlewares en el servidor.
2. **Alta seguridad:** Protección total contra XSS en el manejo de sesiones mediante el encapsulamiento de tokens en el servidor (BFF) y el uso de Cookies HttpOnly.
3. **Escalabilidad:** El código del cliente es más ligero y limpio, delegando la responsabilidad de la autenticación al entorno de Node.js en Next.js.
