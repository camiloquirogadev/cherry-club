import React from "react";
import { motion } from "framer-motion";
import companyWork from "../data/companyWork.json";
import Reveal from "./Reveal";

function Clients() {
  return (
    <section id="clientes" className="max-w-7xl mx-auto px-5 py-20">
      {/* ── Trabajos para empresas ── */}
      <Reveal className="text-center mb-10">
        <p className="text-cherry-hi uppercase tracking-[4px] text-xs mb-2">
          Ya confiaron en Cherry Club
        </p>
        <h2 className="font-display text-ink"
            style={{ fontSize: "clamp(26px,4.5vw,40px)", textShadow: "0 0 18px rgba(200,16,46,.3)" }}>
          🍒 Trabajos para empresas
        </h2>
      </Reveal>

      <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-14">
        {companyWork.map((w, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col items-center gap-3 w-32 sm:w-40"
          >
            <img
              src={w.image}
              alt=""
              loading="lazy"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border border-night-line
                         grayscale opacity-75 transition duration-300
                         group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-cherry-lo group-hover:shadow-glow"
            />
            <figcaption className="text-ink-dim text-sm text-center leading-tight
                                   group-hover:text-ink transition">
              {w.title}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export default Clients;
