import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { useProducts } from "../hooks/useProducts";

export const CATS = [
  { id: "todos", label: "Todo" },
  { id: "remeras", label: "Remeras" },
  { id: "medias", label: "Medias" },
  { id: "stickers", label: "Stickers" },
  { id: "chapitas", label: "Chapitas" },
  { id: "encendedores", label: "Encendedores" },
  { id: "ninos", label: "Niños" },
  { id: "personalizados", label: "Personalizados" },
];

function Catalog({ title = "🍒 El catálogo", initialCat = "todos", featuredOnly = false }) {
  const [cat, setCat] = useState(initialCat);
  const { products, loading } = useProducts();

  const list = useMemo(() => {
    if (featuredOnly) return products.filter((p) => p.featured);
    return cat === "todos" ? products : products.filter((p) => p.category === cat);
  }, [cat, products, featuredOnly]);

  return (
    <>
      <Reveal className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <h2 className="font-display text-ink"
            style={{ fontSize: "clamp(30px,5vw,46px)", textShadow: "0 0 18px rgba(200,16,46,.35)" }}>
          {title}
        </h2>
        {!featuredOnly && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por rubro">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition ${
                  cat === c.id
                    ? "bg-cherry text-white border-transparent shadow-glow"
                    : "bg-night-700 text-ink-dim border-night-line hover:text-ink hover:border-cherry-lo"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
        {featuredOnly && (
          <Link to="/tienda" className="text-sm uppercase tracking-wider text-cherry-hi hover:text-cherry no-underline">
            Ver toda la tienda →
          </Link>
        )}
      </Reveal>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: featuredOnly ? 4 : 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-night-line bg-night-700 overflow-hidden animate-pulse">
              <div className="aspect-square bg-night-600" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-1/3 bg-night-600 rounded" />
                <div className="h-4 w-2/3 bg-night-600 rounded" />
                <div className="h-6 w-1/2 bg-night-600 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="text-ink-faint py-16 text-center">No hay productos en este rubro todavía.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default Catalog;
