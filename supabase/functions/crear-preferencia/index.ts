// Supabase Edge Function: crear-preferencia
// Integra MercadoPago (Checkout Pro): crea una preferencia y devuelve el init_point.
//
// Secrets (Supabase → Edge Functions → Secrets):
//   MP_ACCESS_TOKEN   Access Token de MercadoPago (Credenciales de producción)
//   MP_BACK_URL       (opcional) URL del sitio para volver tras el pago
//
// Deploy:  supabase functions deploy crear-preferencia

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = (Deno.env.get("SITE_ORIGIN") || "https://camiloquirogadev.github.io,http://localhost:5173")
  .split(",").map((value) => value.trim()).filter(Boolean);
const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders(null), "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  const headers = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  const token = Deno.env.get("MP_ACCESS_TOKEN");
  if (!token) return json({ error: "MercadoPago no configurado" }, 500);

  try {
    const { items, envio } = await req.json();
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return json({ error: "El pedido no es válido." }, 400);
    }
    const cleanItems = items.map((item: any) => ({
      id: String(item.id || ""),
      quantity: Number(item.quantity),
    }));
    if (cleanItems.some((item) => !item.id || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 50)) {
      return json({ error: "El pedido contiene cantidades inválidas." }, 400);
    }
    const ids = [...new Set(cleanItems.map((item) => item.id))];
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id,name,price")
      .in("id", ids);
    if (productsError || !products || products.length !== ids.length) {
      return json({ error: "No se pudieron validar los productos." }, 400);
    }
    const byId = new Map(products.map((product) => [String(product.id), product]));
    const mpItems = cleanItems
      .map((item) => {
        const product = byId.get(item.id)!;
        return { title: product.name, quantity: item.quantity, unit_price: Number(product.price) || 0, currency_id: "ARS" };
      })
      .filter((item) => item.unit_price > 0);
    const shipping = Number(envio) || 0;
    if (!Number.isFinite(shipping) || shipping < 0 || shipping > 1000000) {
      return json({ error: "El costo de envío no es válido." }, 400);
    }
    if (shipping > 0) {
      mpItems.push({ title: "Envío", quantity: 1, unit_price: shipping, currency_id: "ARS" });
    }
    if (!mpItems.length) {
      return json({ error: "El pedido tiene productos a consultar. Coordiná por WhatsApp." }, 400);
    }

    const back = Deno.env.get("MP_BACK_URL");
    const pref: any = { items: mpItems };
    if (back) {
      pref.back_urls = { success: back, failure: back, pending: back };
      pref.auto_return = "approved";
    }

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(pref),
    });
    const data = await res.json();
    if (!res.ok) return json({ error: "MercadoPago rechazó la preferencia." }, 502);
    return new Response(JSON.stringify({ init_point: data.init_point, id: data.id }), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch {
    return json({ error: "No se pudo procesar el pago." }, 500);
  }
});
