import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { imgFallback, money, placeholderFor } from "../utils/placeholder";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasBlank = Boolean(product.blank);
  const [showBlank, setShowBlank] = useState(false);
  const aConsultar = !(product.price > 0);

  const toggleBlank = (e) => { e.preventDefault(); e.stopPropagation(); setShowBlank((v) => !v); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative bg-gradient-to-b from-night-700 to-night-800
                 border border-night-line rounded-2xl overflow-hidden flex flex-col
                 hover:border-cherry-lo hover:shadow-glow transition"
    >
      {product.featured && (
        <span className="absolute top-3 left-3 z-20 bg-cherry text-white text-[11px]
                         uppercase tracking-wider py-1 px-2.5 rounded-full">
          ★ Destacado
        </span>
      )}

      {/* Imagen con antes/después (hover en desktop, tap en mobile) */}
      <Link to={`/producto/${product.id}`} className="block relative aspect-square overflow-hidden bg-night-600">
        <img
          src={product.image || placeholderFor(product.category)}
          alt={product.name}
          loading="lazy"
          onError={imgFallback(product.category, product.id)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
                      ${hasBlank ? (showBlank ? "opacity-0" : "group-hover:opacity-0") : "group-hover:scale-105"}`}
        />
        {hasBlank && (
          <>
            <img
              src={product.blank}
              alt={`${product.name} sin sublimar`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
                          ${showBlank ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
            <button
              onClick={toggleBlank}
              aria-pressed={showBlank}
              className="absolute bottom-3 left-3 z-10 bg-night/80 text-ink-dim text-[11px]
                         uppercase tracking-wider py-1.5 px-2.5 rounded-full border border-night-line
                         hover:text-cherry-hi hover:border-cherry-lo transition"
            >
              {showBlank ? "Ver sublimado" : "Ver sin sublimar"}
            </button>
          </>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {product.category && (
          <span className="text-[11px] uppercase tracking-[2px] text-cherry-hi">{product.category}</span>
        )}
        <Link to={`/producto/${product.id}`} className="no-underline">
          <h2 className="text-lg font-medium text-ink leading-tight hover:text-cherry-hi transition">
            {product.name}
          </h2>
        </Link>
        <p className="text-xl font-semibold text-ink mt-auto">
          {money(product.price)}
          {product.price > 0 && <span className="text-xs text-ink-faint font-light"> c/u</span>}
        </p>

        {aConsultar ? (
          <a
            href={`https://wa.me/5491168060403?text=${encodeURIComponent(`Hola Cherry Club! quiero presupuestar: ${product.name}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="mt-2 w-full text-center bg-cherry text-white py-2.5 rounded-lg
                       uppercase tracking-wider text-sm hover:brightness-95 hover:shadow-glow transition no-underline"
          >
            Pedir presupuesto
          </a>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="mt-2 w-full bg-cherry text-white py-2.5 rounded-lg
                       uppercase tracking-wider text-sm hover:brightness-95 hover:shadow-glow transition"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default ProductCard;
