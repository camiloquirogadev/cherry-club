// Supabase Edge Function: cotizar-envio
// Integra la API "Mi Correo" de Correo Argentino (cotización real de envío).
//
// Secrets a configurar (Supabase → Edge Functions → Secrets):
//   CORREO_USER         usuario/token de Mi Correo
//   CORREO_PASS         password/token de Mi Correo
//   CORREO_CUSTOMER_ID  tu customerId de Mi Correo
//   CORREO_CP_ORIGIN    código postal de origen (default 1744 = Moreno, desde donde despacha Cherry Club)
//   CORREO_ENV          "test" o "prod" (default: prod)
//
// Deploy:  supabase functions deploy cotizar-envio
//
// El front la llama con { cp, grams } y recibe { rates:[{tipo,producto,price,plazoMin,plazoMax}] }.

const ALLOWED_ORIGINS = (Deno.env.get("SITE_ORIGIN") || "https://camiloquirogadev.github.io,http://localhost:5173")
  .split(",").map((value) => value.trim()).filter(Boolean);
const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(null), "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  const headers = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  try {
    const { cp, grams } = await req.json();
    const postalCode = String(cp || "").replace(/\D/g, "");
    if (!/^\d{4}$/.test(postalCode)) return json({ error: "El código postal no es válido." }, 400);
    const weightInput = Number(grams);
    if (!Number.isFinite(weightInput) || weightInput < 1 || weightInput > 25000) {
      return json({ error: "El peso del pedido no es válido." }, 400);
    }

    const env = (Deno.env.get("CORREO_ENV") || "prod").toLowerCase();
    const base = env === "test"
      ? "https://apitest.correoargentino.com.ar/micorreo/v1"
      : "https://api.correoargentino.com.ar/micorreo/v1";

    const user = Deno.env.get("CORREO_USER");
    const pass = Deno.env.get("CORREO_PASS");
    const customerId = Deno.env.get("CORREO_CUSTOMER_ID");
    const origin = Deno.env.get("CORREO_CP_ORIGIN") || "1744"; // Moreno por defecto
    if (!user || !pass || !customerId) {
      return json({ error: "Faltan credenciales del Correo (secrets)" }, 500);
    }

    // 1) Token (Basic auth)
    const tokenRes = await fetch(`${base}/token`, {
      method: "POST",
      headers: { Authorization: "Basic " + btoa(`${user}:${pass}`) },
    });
    if (!tokenRes.ok) return json({ error: "Autenticación con el Correo falló" }, 502);
    const tokenData = await tokenRes.json();
    const token = tokenData.token || tokenData.access_token || tokenData.jwt;
    if (!token) return json({ error: "El Correo no devolvió token" }, 502);

    // 2) Cotización (/rates) — contenedor virtual con el peso del carrito
    const weight = Math.min(25000, Math.max(1, Math.round(Number(grams) || 500)));
    const body = {
      customerId: String(customerId),
      postalCodeOrigin: String(origin),
      postalCodeDestination: postalCode,
      dimensions: [{ weight, height: 15, width: 25, length: 30 }],
    };
    const ratesRes = await fetch(`${base}/rates`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!ratesRes.ok) {
      return json({ error: "Cotización del Correo falló." }, 502);
    }
    const data = await ratesRes.json();
    const rates = (data.rates || []).map((r: any) => ({
      tipo: r.deliveredType === "S" ? "sucursal" : "domicilio",
      producto: r.productName,
      price: Number(r.price),
      plazoMin: r.deliveryTimeMin,
      plazoMax: r.deliveryTimeMax,
    }));
    return json({ rates });
  } catch {
    return json({ error: "No se pudo cotizar el envío." }, 500);
  }
});
