import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useCart();
  const [pago, setPago] = useState("mp"); // "mp" o "transfer"
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleMercadoPago = async () => {
    try {
      const res = await fetch("http://localhost:5000/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      window.location.href = data.init_point;
    } catch (err) {
      alert("Error con MercadoPago");
      console.error(err);
    }
  };

  const handleTransferencia = () => {
    alert("Gracias por tu compra 🍒 Enviá el comprobante al WhatsApp.");
    clearCart();
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Resumen del pedido</h2>
      <ul className="mb-4">
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>

      <p className="text-xl font-semibold mb-6">Total: ${total}</p>

      <label className="block font-semibold mb-2">Elegí método de pago:</label>
      <select
        value={pago}
        onChange={(e) => setPago(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4"
      >
        <option value="mp">MercadoPago</option>
        <option value="transfer">Transferencia bancaria</option>
      </select>

      {pago === "mp" ? (
        <button
          onClick={handleMercadoPago}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Pagar con MercadoPago
        </button>
      ) : (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p className="mb-2">CBU: <strong>0000168300000003260502</strong></p>
          <p className="mb-4">Alias: <strong>tienda.cherry.club</strong></p>
          <button
            onClick={handleTransferencia}
            className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Ya hice la transferencia
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
