import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Tu carrito está vacío 🛒</h2>
        <Link to="/" className="text-pink-600 hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Carrito de compras</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">Cantidad: {item.quantity}</p>
              <p className="text-green-700 font-medium">
                ${item.price * item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold mb-4">Total: ${total}</p>
        <Link
          to="/checkout"
          className="inline-block bg-pink-500 text-white px-5 py-2 rounded hover:bg-pink-600"
        >
          Finalizar compra
        </Link>
      </div>
    </div>
  );
}

export default Cart;
