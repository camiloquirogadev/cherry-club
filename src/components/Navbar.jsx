import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-pink-100 px-6 py-4 shadow flex justify-between items-center">
   <Link to="/" className="text-2xl font-bold text-pink-600 flex items-center">
        {/* Reemplazar con el logo */}
        <img
          src="/img/logo.png"  // Asegúrate de que esta ruta sea correcta
          alt="Cherry Club"
          className="h-10 w-auto"  // Ajusta el tamaño del logo según necesites
        />
      </Link>  
       <Link to="/contacto" className="text-pink-800 font-medium hover:underline">
        Contacto
      </Link>
      <Link
        to="/carrito"
        className="text-pink-800 font-medium hover:underline relative"
      >
        🛒 Carrito
        {totalItems > 0 && (
          <span className="ml-2 bg-pink-500 text-white text-sm px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
   
    </nav>
  );
}

export default Navbar;
