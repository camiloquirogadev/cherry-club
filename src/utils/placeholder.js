// Antepone el base del sitio (/cherry-club/ en Pages, / en local) a las rutas
// locales tipo "/img/foo.jpg". Deja intactas las URLs absolutas de Supabase
// (http, data:, blob:), que ya vienen completas.
export function asset(path) {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}

// Emoji por categoría y cadena de respaldo de imágenes.
export const CAT_EMOJI = {
  remeras: "👕",
  medias: "🧦",
  stickers: "✨",
  chapitas: "📛",
  encendedores: "🔥",
  ninos: "🧒",
  personalizados: "🍒",
};

// Palabra clave para imágenes temáticas gratuitas (LoremFlickr → fotos de Flickr por tag).
const FLICKR_KW = {
  remeras: "tshirt",
  medias: "socks",
  stickers: "stickers",
  chapitas: "badge,pin",
  encendedores: "lighter",
  ninos: "children,clothing",
  personalizados: "gift",
};

export function placeholderFor(category = "personalizados") {
  const em = CAT_EMOJI[category] || "🍒";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#4a0d1c'/><stop offset='1' stop-color='#17101a'/>
    </linearGradient></defs>
    <rect width='400' height='400' fill='url(#g)'/>
    <text x='50%' y='46%' font-size='120' text-anchor='middle' dominant-baseline='middle'>${em}</text>
    <text x='50%' y='68%' font-size='18' fill='#a99fb0' font-family='sans-serif' text-anchor='middle' letter-spacing='2'>FOTO PRÓXIMAMENTE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Respaldo para <img onError>: si falta la foto real, muestra el placeholder del rubro
// (emoji sobre fondo dark). Consistente y honesto — sin fotos de stock aleatorias.
export function imgFallback(category = "personalizados") {
  return (e) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = placeholderFor(category);
  };
}

export const money = (n) =>
  n > 0 ? "$" + Number(n).toLocaleString("es-AR") : "A consultar";
