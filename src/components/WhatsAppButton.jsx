import React from "react";

function WhatsAppButton() {
  const href = `https://wa.me/5491168060403?text=${encodeURIComponent(
    "Hola Cherry Club! quiero hacer un pedido"
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 text-white w-14 h-14 grid place-items-center
                 rounded-full shadow-lg hover:bg-green-500 hover:scale-105 transition-all
                 ring-2 ring-green-400/30"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fa fa-whatsapp text-3xl"></i>
    </a>
  );
}

export default WhatsAppButton;
