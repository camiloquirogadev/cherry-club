import React from "react";
import { motion } from "framer-motion";

// Fade + slide-up al entrar en viewport. Respeta reduced-motion (MotionConfig global).
export default function Reveal({ children, className = "", delay = 0, y = 24, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
