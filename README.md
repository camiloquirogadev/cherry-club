# Cherry Club 🍒 — Tienda de personalizados

Tienda online (React + Vite + Tailwind + Framer Motion) con estética **dark emo**.
Catálogo con filtros por rubro, carrito y pedido por **WhatsApp** (+ checkout online opcional).

Info real desde Instagram [@tienda.cherry.club](https://www.instagram.com/tienda.cherry.club/) ·
WhatsApp **11 6806-0403**.

## Correr en local
```bash
npm install
npm run dev
```
Abre en http://localhost:5173 (o el puerto que asigne Vite).

## Estructura
```
src/
├── data/products.json      # 👈 catálogo (nombre, precio, rubro, imagen). Editá esto.
├── utils/placeholder.js     # emoji por rubro + placeholder de fotos + formato de precio
├── components/              # Navbar, Home (hero + catálogo), ProductCard, Footer, WhatsAppButton, ContactForm
├── pages/                   # Product, Cart, Checkout, ContactPage
└── context/CartContext.jsx  # estado del carrito
public/img/                  # 👈 poné acá las fotos (ver LEER-poner-fotos-aca.txt)
```

## Cargar fotos
1. Guardá cada foto en `public/img/` con el nombre que figura en `products.json`
   (ej. `remera-01.jpg`). Ver `public/img/LEER-poner-fotos-aca.txt`.
2. Si falta una foto, se muestra un placeholder con el emoji del rubro (no rompe nada).

## Editar productos
Todo en `src/data/products.json`:
- `name`, `price` (número, `0` ⇒ "A consultar"), `description`, `category`, `featured` (★).
- Rubros: `remeras, medias, stickers, chapitas, encendedores, ninos, personalizados`.

## Panel de la dueña (Supabase)
La tienda funciona con `src/data/products.json` **sin configurar nada**. Para que la dueña
inicie sesión y cargue/edite productos con fotos, se usa Supabase (gratis):

1. Crear un proyecto en https://supabase.com
2. En **SQL Editor**, pegar y correr todo `supabase/setup.sql` (crea la tabla, el bucket de fotos, las políticas y carga los 12+ productos actuales).
3. En **Authentication → Users**, crear el usuario de la dueña (email + contraseña).
4. Copiar `.env.example` a `.env` y completar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (están en **Project Settings → API**).
5. `npm run dev`. La dueña entra en **/admin**, inicia sesión y administra productos (crear, editar, borrar, subir fotos).

Sin `.env`, `/admin` avisa que falta configurar y la tienda sigue mostrando los productos locales.

## Páginas
- `/` inicio (hero + tienda + clientes + nosotros)
- `/tienda` catálogo completo con filtros
- `/#clientes` trabajos para empresas + testimonios
- `/contacto` formulario (abre WhatsApp)
- `/admin` panel de la dueña (requiere Supabase)

## Tipografías
Título **Pirata One** (gótica) · texto **Space Grotesk** · frases **Cormorant Garamond**.

## Antes/después (sin sublimar → sublimado)
Las cards muestran el producto sublimado y, al pasar el mouse, la versión **sin sublimar**
(estilo Tiendanube). Se activa con el campo `"blank"` en `products.json` (o `blank_url` en Supabase).
Hoy tienen blank: remeras, remera niños y vaso. Para sumar más, poné la foto en blanco en
`public/img` y completá `blank`. (MercadoLibre bloquea el scraping automático, así que los blanks
actuales son de stock — reemplazalos por los de tu proveedor.)

## Pagos
- **WhatsApp + Transferencia:** funcionan sin backend (flujo principal). El checkout muestra CBU/alias.
- **MercadoPago (tarjeta en el sitio):** Edge Function `supabase/functions/crear-preferencia`
  (Checkout Pro). Deploy: `supabase functions deploy crear-preferencia`. Secret:
  `MP_ACCESS_TOKEN` (y opcional `MP_BACK_URL`). Hasta configurarlo, el botón avisa que el pago
  con tarjeta no está activo y sugiere WhatsApp/transferencia (no rompe).

## Envío — Correo Argentino (integrado)
Cherry Club despacha desde **Moreno (CP 1744)** a todo el país.

- **Cotización real:** Edge Function de Supabase `supabase/functions/cotizar-envio` que llama la
  API *Mi Correo* del Correo Argentino. Deploy: `supabase functions deploy cotizar-envio`.
  Secrets (Supabase → Edge Functions → Secrets): `CORREO_USER`, `CORREO_PASS`,
  `CORREO_CUSTOMER_ID` y `CORREO_CP_ORIGIN=1744`. El checkout muestra domicilio/sucursal con precio real.
- **Fallback:** si la función no está configurada, el checkout usa el estimador por zona
  (`src/lib/shipping.js`, tarifas editables en `RATES`). También hay **retiro en persona (gratis)**.

## SEO y marketing (ya integrado)
- **Meta + keywords locales** (Moreno / Buenos Aires) y **Open Graph** en `index.html`.
- **Datos estructurados**: schema `Store` en `index.html` y `Product` dinámico por producto → Google puede mostrar precio.
- **`sitemap.xml`** + **`robots.txt`** en `public/`. Regenerá el sitemap si agregás productos.
- **Títulos por página** y **meta description por producto**.
- **Botones de compartir** (Compartir nativo / WhatsApp / copiar link) en cada producto.
- **Píxeles / analítica**: pegá tus IDs en `index.html` → `window.CHERRY_IDS = { ga4, metaPixel, tiktok }`.
  Con IDs vacíos no carga nada. Con IDs, se activan Google Analytics 4, Meta Pixel y TikTok Pixel (para medir y hacer ads/retargeting).

**Pasos manuales recomendados:** dar de alta el sitio en **Google Search Console** (subir el sitemap),
crear el **catálogo de Instagram/Facebook** (Commerce Manager) y **Google Merchant** para listar productos.

## Deploy (GitHub Pages)
```bash
npm run deploy   # build + gh-pages -d dist
```
`vite.config.js` usa `base: /cherry-club/` solo en build, y el Router respeta ese basename,
así que las rutas funcionan tanto en local (`/`) como en Pages (`/cherry-club/`).
```
```
