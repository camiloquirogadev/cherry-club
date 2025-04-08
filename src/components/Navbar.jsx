import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 bg-white z-50 flex justify-between items-center px-6 py-4 shadow">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center no-underline hover:no-underline focus:no-underline"
      >
        <img
          src="/img/logo.png"
          alt="Cherry Club"
          className="h-10 w-auto"
        />
      </Link>

      {/* Enlaces + carrito */}
      <div className="flex items-center gap-4">
        {/* Inicio */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="no-underline hover:no-underline focus:no-underline bg-white text-pink-700 font-medium py-1 px-3 rounded shadow hover:bg-pink-50 transition"
          >
            Inicio
          </Link>
        </motion.div>

        {/* Contacto */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/contacto"
            className="no-underline hover:no-underline focus:no-underline bg-white text-pink-700 font-medium py-1 px-3 rounded shadow hover:bg-pink-50 transition"
          >
            Contacto
          </Link>
        </motion.div>

        {/* Carrito */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/carrito"
            className="no-underline hover:no-underline focus:no-underline bg-pink-500 text-white font-medium py-1 px-3 rounded shadow hover:bg-pink-600 transition relative flex items-center"
          >
            🛒 Mi Carrito
            {totalItems > 0 && (
              <span className="ml-2 bg-white text-pink-600 text-sm px-2 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
