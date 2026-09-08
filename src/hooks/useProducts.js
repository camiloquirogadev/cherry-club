import { useState, useEffect } from "react";
import { supabase, SUPABASE_ENABLED, PRODUCTS_TABLE } from "../lib/supabase";
import local from "../data/products.json";

// Normaliza una fila de Supabase al formato que usan los componentes.
export function normalize(row) {
  return {
    id: String(row.id),
    name: row.name,
    category: row.category,
    description: row.description || "",
    price: Number(row.price) || 0,
    image: row.image_url || row.image || "",
    blank: row.blank_url || row.blank || "",
    featured: Boolean(row.featured),
  };
}

// Carga productos desde Supabase; si no está configurado o falla, usa los locales.
export function useProducts() {
  const [products, setProducts] = useState(SUPABASE_ENABLED ? [] : local);
  const [loading, setLoading] = useState(SUPABASE_ENABLED);

  useEffect(() => {
    if (!SUPABASE_ENABLED) return;
    let active = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from(PRODUCTS_TABLE)
          .select("*")
          .order("created_at", { ascending: true });
        if (!active) return;
        if (error || !data || data.length === 0) setProducts(local);
        else setProducts(data.map(normalize));
      } catch {
        if (active) setProducts(local);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return { products, loading };
}
