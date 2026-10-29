# Sky V Cosmetics · Sitio web

Este es el sitio web (el frontend) de **Sky V Cosmetics**, la tienda virtual de mi emprendimiento de cosméticos. Es el mismo sitio de mi Entrega 1, ahora hecho en Next.js con TypeScript y Tailwind. Los productos llegan desde mi propia API. Además, se puede crear una cuenta, iniciar sesión, hacer pedidos y como admin manejar el catálogo.

## Links

- **Sitio web:** https://skyv-web.vercel.app
- **API:** https://skyv-api.onrender.com/api/productos
- **Repositorio del backend:** https://github.com/valeryy86/skyv-api


## Cómo correrlo en local

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Crear un archivo `.env.local` con:
   ```
   NEXT_PUBLIC_API_HOST=https://skyv-api.onrender.com
   ```
3. Encender el sitio:
   ```bash
   npm run dev
   ```
   Abrir http://localhost:3000

### Variables de entorno

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_API_HOST` | La dirección de la API, sin `/api` al final |

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| admin | admin@skyv.com | Admin123* |
| user | cliente@skyv.com | Cliente123* |


## Decisiones técnicas

### ¿Cómo funciona el login, de principio a fin?

1. La persona llena el formulario de login y le da "Ingresar". El formulario revisa primero que los campos estén bien escritos.
2. La página manda el correo y la contraseña a la API (`POST /api/auth/login`).
3. La API revisa los datos y, si son correctos, responde con un token JWT y los datos del usuario.
4. La página guarda el token en una cookie. La barra de navegación cambia: muestra el nombre del usuario y "Salir", y si es admin también muestra "Administración".
5. Desde ese momento, cada petición a la API lleva el token en el header `Authorization: Bearer <token>`. Eso lo hace solo el archivo `http.ts`.
6. Al entrar a una página protegida como "Mis pedidos", la página pide `GET /api/pedidos/mias`. La API revisa el token y responde solo los pedidos de ese usuario.
7. Si refresco la página, el sitio encuentra el token en la cookie y la sesión sigue activa.

### ¿Dónde guardo el token y qué riesgo tiene?

Lo guardo en una cookie del navegador. La escogí porque la sesión no se pierde al refrescar la página, y porque `proxy.ts` también puede leerla para redirigir a `/login` antes de mostrar una página privada.

El riesgo es que JavaScript puede leer esa cookie. Si alguien lograra meter código malicioso en la página (un ataque XSS), podría robarse el token y entrar como esa persona hasta que el token venza. Para que el daño sea menor, el token dura solo 1 día.

### ¿Cuándo la API responde 401 y cuándo 403?

- **401:** la API no sabe quién eres (no hay token, o es falso o venció).
- **403:** la API sabe quién eres, pero no tienes permiso.

Ejemplo de mi proyecto: `DELETE /api/productos/1` sin token responde **401**. Con el token de `cliente@skyv.com` responde **403**, porque solo el admin puede borrar productos. En el sitio, si la API responde 401 estando con sesión, se cierra la sesión y se lleva a la persona a `/login`.

### ¿Usé inteligencia artificial?

Sí. La usé como guía para aprender, como en la Entrega 1. Me ayudó con un paso a paso, con el código base y explicándome lo que para mí era mas difícil, como los hooks, la sesión y cómo conectar el sitio con la API.

Lo que tuve que resolver y corregir yo:
- Pasé las imágenes de mi Entrega 1 al nuevo proyecto y mantuve mis colores, mi fuente y mi contenido.
- El formulario de pedido no cambiaba de producto al elegir otro en el catálogo, y lo corregí.
- El despliegue en Vercel falló por un error en el footer, y lo corregí.
- Configuré las variables de entorno en Vercel y conecté el sitio con la API.

## Bonus

- Filtros combinados en el catálogo (texto, categoría y rango de precio).
- Confirmación antes de eliminar un producto en el panel de administración.
- Protección de rutas en el servidor con `proxy.ts`, leyendo el token desde una cookie.

## Captura de una petición protegida

![Petición con el header Authorization](capturas/network.png)