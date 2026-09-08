import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/tienda", label: "Tienda" },
  { to: "/#clientes", label: "Clientes" },
  { to: "/contacto", label: "Contacto" },
];

function Navbar() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav aria-label="Principal" className="sticky top-0 z-50 bg-night-800/90 backdrop-blur border-b border-night-line">
      <div className="flex justify-between items-center px-5 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/" onClick={toTop} className="flex items-center gap-2 no-underline">
          <span className="text-2xl drop-shadow-[0_0_6px_#c8102e]">🍒</span>
          <span className="font-display text-2xl tracking-wide text-ink">
            Cherry<span className="text-cherry-hi">Club</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={l.to === "/" ? toTop : undefined}
                    className="no-underline text-ink-dim hover:text-cherry-hi uppercase tracking-widest text-sm py-2 px-3 rounded-lg transition">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Carrito */}
          <Link to="/carrito" aria-label={`Carrito (${totalItems})`}
                className="no-underline relative flex items-center gap-2 bg-cherry text-white
                           font-body uppercase tracking-wider text-sm py-2 px-4 rounded-full hover:shadow-glow transition">
            <span aria-hidden="true">🛒</span>
            <span className="hidden sm:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 grid place-items-center
                               bg-night border border-cherry-lo text-cherry-hi text-xs font-bold rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburguesa mobile */}
          <button onClick={() => setOpen((v) => !v)} aria-label="Menú" aria-expanded={open}
                  className="md:hidden w-11 h-11 grid place-items-center rounded-lg border border-night-line text-ink hover:border-cherry-lo transition">
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="md:hidden overflow-hidden border-t border-night-line">
            <div className="flex flex-col px-5 py-2">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => { setOpen(false); if (l.to === "/") toTop(); }}
                      className="no-underline text-ink-dim hover:text-cherry-hi uppercase tracking-widest text-sm py-3 border-b border-night-line/50 last:border-0">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
