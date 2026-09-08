// Supabase Edge Function: crear-preferencia
// Integra MercadoPago (Checkout Pro): crea una preferencia y devuelve el init_point.
//
// Secrets (Supabase → Edge Functions → Secrets):
//   MP_ACCESS_TOKEN   Access Token de MercadoPago (Credenciales de producción)
//   MP_BACK_URL       (opcional) URL del sitio para volver tras el pago
//
// Deploy:  supabase functions deploy crear-preferencia

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  const token = Deno.env.get("MP_ACCESS_TOKEN");
  if (!token) return json({ error: "MercadoPago no configurado" }, 500);

  try {
    const { items, envio } = await req.json();
    const mpItems = (items || [])
      .map((i: any) => ({ title: i.name, quantity: Number(i.quantity) || 1, unit_price: Number(i.price) || 0, currency_id: "ARS" }))
      .filter((i: any) => i.unit_price > 0);
    if (envio && Number(envio) > 0) {
      mpItems.push({ title: "Envío", quantity: 1, unit_price: Number(envio), currency_id: "ARS" });
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
    if (!res.ok) return json({ error: "MercadoPago rechazó la preferencia", detail: data }, 502);
    return json({ init_point: data.init_point, id: data.id });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
