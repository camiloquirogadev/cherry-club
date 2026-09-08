import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Catalog from "../components/Catalog";
import Clients from "../components/Clients";
import Reveal from "../components/Reveal";

const WHATSAPP = "5491168060403";

function Home() {
  const waPedido = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hola Cherry Club! quiero hacer un pedido"
  )}`;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-center px-5 pt-24 pb-20">
        <motion.div aria-hidden
             className="pointer-events-none absolute -top-1/3 left-1/2 w-[620px] h-[620px]
                        rounded-full blur-3xl max-w-[95vw]"
             style={{ background: "radial-gradient(circle, rgba(200,16,46,.28), transparent 65%)" }}
             initial={{ x: "-50%", scale: 1, opacity: 0.7 }}
             animate={{ x: "-50%", scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-cherry-hi uppercase tracking-[4px] text-xs mb-4">
            ✦ Personalizados · Mayorista &amp; Minorista ✦
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display leading-[0.9] text-ink"
            style={{ fontSize: "clamp(56px,12vw,120px)", textShadow: "0 0 30px rgba(200,16,46,.5), 0 6px 0 #000" }}
          >
            CHERRY<span className="block text-cherry">CLUB</span>
          </motion.h1>
          <p className="font-serif italic text-ink-dim mt-5 mb-8"
             style={{ fontSize: "clamp(18px,3vw,26px)" }}>
            Remeras, tazas, stickers y más, personalizados a pedido.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/tienda" className="btn-cherry no-underline">Ver la tienda</Link>
            <a href={waPedido} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Pedir por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-ink-faint text-xs uppercase tracking-[2px]">
            Argentina · Envíos a todo el país
          </p>
        </div>
      </section>

      {/* ── Catálogo ── */}
      <section id="catalogo" className="max-w-7xl mx-auto px-5 pb-24">
        <Catalog featuredOnly title="🍒 Destacados" />
      </section>

      {/* ── Clientes ── */}
      <Clients />

      {/* ── Nosotros ── */}
      <section className="border-t border-b border-night-line bg-night-700/40">
        <Reveal className="max-w-2xl mx-auto px-5 py-16 text-center">
          <h2 className="font-display text-ink mb-5"
              style={{ fontSize: "clamp(28px,5vw,42px)" }}>
            🍒 Cherry Club
          </h2>
          <p className="text-ink-dim text-lg leading-relaxed mb-8">
            Personalizados hechos a mano en Argentina. Remeras, medias, stickers, chapitas,
            encendedores y más — tu diseño o el nuestro. Pedidos{" "}
            <strong className="text-cherry-hi">mayoristas y minoristas</strong>, con envíos a todo el país.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={waPedido} target="_blank" rel="noopener noreferrer" className="btn-cherry">
              Escribinos por WhatsApp
            </a>
            <a href="https://www.instagram.com/tienda.cherry.club/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              @tienda.cherry.club
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default Home;
