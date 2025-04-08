import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Layout y navegación
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Contexto
import { CartProvider } from "./context/CartContext";

// Páginas
import Home from "./components/Home";
import ProductDetail from "./pages/ProductDetail";
import Catalogo from "./pages/Catalogo";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Barra de navegación persistente */}
        <Navbar />

        {/* Contenido dinámico por rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/product" element={<Catalogo />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>

        {/* Footer y botón de WhatsApp en todas las páginas */}
        <Footer />
        <WhatsAppButton />
      </Router>
    </CartProvider>
  );
}

export default App;
