import React from "react";
import ContactForm from "../components/ContactForm";

function ContactPage() {
  return (
    <div className="min-h-[60vh]">
      <h1 className="font-display text-5xl text-center pt-14 pb-2 text-ink"
          style={{ textShadow: "0 0 18px rgba(200,16,46,.35)" }}>
        🍒 Contacto
      </h1>
      <p className="text-center text-ink-dim mb-4">Escribinos y armamos tu pedido personalizado.</p>
      <ContactForm />
    </div>
  );
}

export default ContactPage;
