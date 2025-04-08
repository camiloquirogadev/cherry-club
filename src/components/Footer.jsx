// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-pink-100 text-gray-700 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Marca */}
        <div>
          <h2 className="text-xl font-bold text-pink-600">Cherry Club 🍒</h2>
          <p className="mt-2">Productos personalizados con diseño único. Hecho con amor 💖</p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="font-semibold mb-2">Secciones</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-pink-500">Inicio</a></li>
            <li><a href="#" className="hover:text-pink-500">Tienda</a></li>
            <li><a href="#" className="hover:text-pink-500">Contacto</a></li>
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h3 className="font-semibold mb-2">Redes Sociales</h3>
          <ul className="space-y-1">
            <li><a href="https://instagram.com/tienda.cherry.club" target="_blank" className="hover:text-pink-500">Instagram</a></li>
            <li><a href="https://wa.me/5491168060403" className="hover:text-pink-500">WhatsApp</a></li>
            <li><a href="#" className="hover:text-pink-500">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Cherry Club. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
