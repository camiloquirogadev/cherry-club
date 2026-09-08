// src/components/Footer.jsx
import { Link } from "react-router-dom";

const linkCls = "text-ink-dim hover:text-cherry-hi no-underline transition";
const headCls = "font-semibold mb-3 text-ink uppercase tracking-wider text-xs";

const Footer = () => {
  return (
    <footer className="bg-night-800 text-ink-dim border-t border-night-line">
      {/* acento cherry */}
      <div className="h-px bg-gradient-to-r from-transparent via-cherry to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-5 pt-12 pb-8 flex flex-col sm:flex-row sm:justify-between gap-10 text-sm">
        {/* Marca */}
        <div className="max-w-xs">
          <h2 className="font-display text-2xl text-ink">
            Cherry<span className="text-cherry-hi">Club</span> 🍒
          </h2>
          <p className="mt-2 text-ink-dim">Personalizados &amp; sublimados con actitud.</p>
          <p className="mt-3 text-xs text-ink-faint">📍 Moreno, Buenos Aires · Envíos a todo el país</p>
        </div>

        {/* Links */}
        <div className="flex justify-between gap-8 sm:justify-start sm:gap-20">
          <div>
            <h3 className={headCls}>Secciones</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={linkCls}>Inicio</Link></li>
              <li><Link to="/tienda" className={linkCls}>Tienda</Link></li>
              <li><Link to="/#clientes" className={linkCls}>Clientes</Link></li>
              <li><Link to="/contacto" className={linkCls}>Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={headCls}>Seguinos</h3>
            <ul className="space-y-2">
              <li><a href="https://www.instagram.com/tienda.cherry.club/" target="_blank" rel="noopener noreferrer" className={linkCls}>Instagram</a></li>
              <li><a href="https://www.tiktok.com/@cherry.club3" target="_blank" rel="noopener noreferrer" className={linkCls}>TikTok</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61575147095015" target="_blank" rel="noopener noreferrer" className={linkCls}>Facebook</a></li>
              <li><a href="https://wa.me/5491168060403" target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-night-line/60">
        <p className="max-w-7xl mx-auto px-5 py-5 text-center text-xs text-ink-faint">
          © {new Date().getFullYear()} Cherry Club · Hecho con sangre y píxeles 🍒
        </p>
      </div>
    </footer>
  );
};

export default Footer;
