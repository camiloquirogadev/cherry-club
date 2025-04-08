import React from "react";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5491168060403" // Cambia este número por el tuyo
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fa fa-whatsapp text-3xl"></i>  {/* Aquí está la clase correcta para WhatsApp */}
    </a>
  );
}

export default WhatsAppButton;
