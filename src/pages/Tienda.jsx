import React from "react";
import Catalog from "../components/Catalog";

function Tienda() {
  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-5 pt-14 pb-24">
      <div className="text-center mb-10">
        <h1 className="font-display text-5xl md:text-6xl text-ink"
            style={{ textShadow: "0 0 24px rgba(200,16,46,.4)" }}>
          🍒 Tienda
        </h1>
        <p className="text-ink-dim mt-2">Elegí tu rubro y armá tu pedido.</p>
      </div>
      <Catalog title="Todos los productos" />
    </div>
  );
}

export default Tienda;
