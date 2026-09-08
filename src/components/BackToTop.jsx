import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className="fixed bottom-24 right-6 z-50 w-14 h-14 grid place-items-center rounded-full
                 bg-night-700 border border-cherry-lo text-cherry-hi text-2xl shadow-glow
                 hover:bg-cherry hover:text-white hover:scale-105 transition-all"
    >
      ↑
    </button>
  );
}
