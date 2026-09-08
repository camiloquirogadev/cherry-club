import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => { document.title = "Página no encontrada · Cherry Club 🍒"; }, []);
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5 py-20">
      <p className="font-display text-cherry-hi leading-none" style={{ fontSize: "clamp(64px,16vw,140px)", textShadow: "0 0 30px rgba(200,16,46,.5)" }}>404</p>
      <h1 className="font-display text-3xl text-ink mb-2">Página no encontrada 🍒</h1>
      <p className="text-ink-dim mb-6">Esa página no existe o se movió de lugar.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link to="/" className="btn-cherry no-underline">Ir al inicio</Link>
        <Link to="/tienda" className="btn-ghost no-underline">Ver la tienda</Link>
      </div>
    </div>
  );
}
