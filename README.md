# Cherry Club

Tienda online de productos personalizados (remeras, medias, stickers, chapitas, encendedores).
Frontend en React + Vite + Tailwind, con estética dark. El catálogo sale de un JSON, así que
la tienda anda sin backend; Supabase es opcional y solo se usa para el panel de administración.

Es un proyecto real para un emprendimiento ([@tienda.cherry.club](https://www.instagram.com/tienda.cherry.club/)),
no un demo.

## Correr en local

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`.

## Cómo está armado

```
src/
  data/products.json     catálogo (nombre, precio, rubro, imagen)
  components/            Navbar, Home, ProductCard, Footer, WhatsAppButton, ContactForm
  pages/                 Product, Cart, Checkout, ContactPage, Admin
  context/CartContext    estado del carrito
  lib/shipping.js        estimador de envío por zona (fallback)
public/img/              fotos de los productos
```

Rutas: `/` (inicio), `/tienda` (catálogo con filtros), `/contacto` (form que abre WhatsApp),
`/admin` (panel de la dueña, necesita Supabase).

## Cargar productos y fotos

El catálogo por defecto es `src/data/products.json`. Cada producto tiene `name`, `price`
(un `0` se muestra como "A consultar"), `description`, `category` y `featured`. Las fotos van
en `public/img/` con el mismo nombre que figura en el JSON. Si falta una foto, se muestra un
placeholder con el emoji del rubro y no se rompe nada.

Las cards tienen un efecto sublimado → sin sublimar al pasar el mouse; se activa con el campo
`blank` en el producto.

## Panel de administración (Supabase, opcional)

Para que la dueña cargue y edite productos desde `/admin` sin tocar el código:

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. Correr `supabase/setup.sql` en el SQL Editor (crea la tabla, el bucket de fotos, las
   políticas y carga los productos actuales).
3. Crear el usuario de la dueña en Authentication → Users.
4. Copiar `.env.example` a `.env` y completar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

Sin `.env`, `/admin` avisa que falta configurar y la tienda sigue funcionando con el JSON local.

## Pagos y envío

El flujo principal es pedido por WhatsApp con transferencia (CBU/alias en el checkout), sin
backend. Como opcionales hay dos Edge Functions de Supabase:

- `crear-preferencia`: MercadoPago Checkout Pro (tarjeta en el sitio). Sin configurar, el botón
  sugiere WhatsApp/transferencia.
- `cotizar-envio`: cotización real de Correo Argentino desde Moreno (CP 1744). Si no está,
  el checkout usa el estimador por zona de `src/lib/shipping.js` o el retiro en persona.

## SEO

`index.html` incluye meta tags locales, Open Graph y datos estructurados (schema `Store` y
`Product` por producto). Hay `sitemap.xml` y `robots.txt` en `public/`. Los IDs de analítica
(GA4, Meta, TikTok) se pegan en `window.CHERRY_IDS` dentro de `index.html`; vacíos no cargan nada.

## Deploy

Se publica en GitHub Pages con el workflow de `.github/workflows/deploy.yml`: cada push a `main`
buildea y despliega. En el repo hay que dejar Settings → Pages → Source en "GitHub Actions" una
sola vez.

Detalle: en build, `vite.config.js` usa `base: /cherry-club/` y el Router toma ese basename, así
que las rutas andan igual en local (`/`) que en Pages (`/cherry-club/`). El `public/404.html`
redirige las subrutas al index para que refrescar no tire error.
