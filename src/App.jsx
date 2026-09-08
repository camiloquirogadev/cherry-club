import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { CartProvider } from "./context/CartContext";
import Tienda from "./pages/Tienda";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import CartToast from "./components/CartToast";

// Título por ruta (SEO / compartir). Product ajusta el suyo con el nombre.
const TITLES = {
  "/": "Cherry Club 🍒 · Personalizados",
  "/tienda": "Tienda · Cherry Club 🍒",
  "/contacto": "Contacto · Cherry Club 🍒",
  "/carrito": "Tu pedido · Cherry Club 🍒",
  "/checkout": "Checkout · Cherry Club 🍒",
  "/admin": "Panel · Cherry Club 🍒",
};

function RouteTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (TITLES[pathname]) document.title = TITLES[pathname];
  }, [pathname]);
  return null;
}

// Maneja el scroll al navegar: si hay #hash va a la sección, si no sube al inicio.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const go = () => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
      go();
      const t = setTimeout(go, 200);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <MotionConfig reducedMotion="user">
      <Router basename={import.meta.env.BASE_URL}>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100]
                                        focus:bg-cherry focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
          Saltar al contenido
        </a>
        <RouteTitle />
        <ScrollManager />
        <Navbar />
        <main id="contenido">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/producto/:id" element={<Product />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <CartToast />
      </Router>
      </MotionConfig>
    </CartProvider>
  );
}

export default App;
