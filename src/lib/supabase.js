import { createClient } from "@supabase/supabase-js";

// Credenciales desde variables de entorno (.env). Ver README (sección Supabase).
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si no hay credenciales, la tienda funciona igual con los productos locales.
export const SUPABASE_ENABLED = Boolean(url && key);
export const supabase = SUPABASE_ENABLED ? createClient(url, key) : null;

export const PRODUCTS_TABLE = "products";
export const IMAGES_BUCKET = "product-images";
