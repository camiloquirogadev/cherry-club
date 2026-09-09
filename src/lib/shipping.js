import { supabase, SUPABASE_ENABLED } from "./supabase";

// ── Cálculo de envío por Correo Argentino ──
// Estimador por zona (según código postal) y peso del carrito.
// EDITÁ las tarifas en RATES con los valores que te dé el Correo.
// Para cotización EXACTA en vivo hace falta cuenta de Correo Argentino (Mi Correo / Paq.ar)
// + una función serverless que llame a su API (ver README).

// Peso aproximado por rubro (gramos). Ajustá si hace falta.
export const WEIGHTS_G = {
  remeras: 200, ninos: 150, medias: 100, stickers: 50,
  chapitas: 30, encendedores: 60, personalizados: 400,
};

// Cherry Club despacha desde Moreno (Buenos Aires) a todo el país.
export const ORIGIN_CP = "1744"; // Moreno

export function cartWeightGrams(cart) {
  return cart.reduce((s, i) => s + (WEIGHTS_G[i.category] || 200) * i.quantity, 0);
}

// Zona por código postal argentino (aproximado). Editable.
export function zoneForCP(cp) {
  const n = parseInt(String(cp).replace(/\D/g, "").slice(0, 4), 10);
  if (!n) return null;
  if (n >= 1000 && n <= 1900) return "amba";                 // CABA + GBA
  if ((n >= 2000 && n <= 3300) || (n >= 5000 && n <= 6300)) return "centro"; // Litoral/Centro/Cuyo cercano
  return "lejos";                                            // NOA/NEA/Patagonia
}

// Tarifas Correo Argentino (APROXIMADAS — reemplazá con las reales).
export const RATES = {
  amba:   { base: 2500, perKg: 900 },
  centro: { base: 3500, perKg: 1200 },
  lejos:  { base: 4800, perKg: 1600 },
};

export const ZONE_LABEL = {
  amba: "AMBA (CABA/GBA)",
  centro: "Centro / Litoral / Cuyo",
  lejos: "Norte / Patagonia",
};

// Devuelve { zone, label, kg, cost } o null si el CP es inválido.
export function estimateShipping(cp, grams) {
  const zone = zoneForCP(cp);
  if (!zone) return null;
  const safeGrams = Number(grams);
  if (!Number.isFinite(safeGrams) || safeGrams < 1 || safeGrams > 25000) return null;
  const kg = Math.max(0.5, safeGrams / 1000);
  const r = RATES[zone];
  const cost = Math.round((r.base + r.perKg * kg) / 100) * 100;
  return { zone, label: ZONE_LABEL[zone], kg: Math.round(kg * 10) / 10, cost };
}

// Cotización real: llama la Edge Function de Supabase (API Mi Correo).
// Si Supabase/función no está configurada o falla, cae al estimador.
// Devuelve { source: "correo"|"estimado", rates: [{tipo, producto, price, plazoMin?, plazoMax?}] } o null.
export async function fetchQuote(cp, grams) {
  if (SUPABASE_ENABLED) {
    try {
      const { data, error } = await supabase.functions.invoke("cotizar-envio", { body: { cp, grams } });
      if (!error && data && Array.isArray(data.rates) && data.rates.length) {
        return { source: "correo", rates: data.rates };
      }
    } catch (_) { /* cae al estimador */ }
  }
  const est = estimateShipping(cp, grams);
  if (!est) return null;
  return { source: "estimado", rates: [{ tipo: "domicilio", producto: est.label + " (estimado)", price: est.cost }] };
}
