import React, { useState } from "react";

const WHATSAPP = "5491168060403";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    // Enviamos el mensaje directo por WhatsApp
    const texto = `Hola Cherry Club!\nNombre: ${name}\nMail: ${email}\nMensaje: ${message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank");
    setFormData({ name: "", email: "", message: "" });
  };

  const inputCls =
    "w-full p-2.5 rounded-lg bg-night-700 border border-night-line text-ink placeholder-ink-faint " +
    "focus:border-cherry outline-none transition";

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-ink-dim mb-1" htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" value={formData.name}
                 onChange={handleChange} className={inputCls} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-dim mb-1" htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" value={formData.email}
                 onChange={handleChange} className={inputCls} required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink-dim mb-1" htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" value={formData.message}
                    onChange={handleChange} rows="4" className={inputCls} required></textarea>
        </div>
        <button type="submit" className="btn-cherry w-full text-center">
          Enviar por WhatsApp
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
