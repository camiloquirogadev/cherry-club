import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { imgFallback, money, placeholderFor } from "../utils/placeholder";

const WHATSAPP = "5491168060403";

function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const hayAConsultar = cart.some((i) => !(i.price > 0));

  const buildWhatsApp = () => {
    let msg = "Hola Cherry Club! quiero pedir:\n\n";
    cart.forEach((i) => {
      const sub = i.price * i.quantity;
      msg += `- ${i.quantity}x ${i.name}` + (i.price > 0 ? ` — ${money(sub)}` : " — a consultar") + "\n";
    });
    if (total > 0) msg += `\nTotal aprox: ${money(total)}`;
    msg += "\n\n¿Me confirman disponibilidad y envío?";
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  };

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <span className="text-5xl mb-4 opacity-70">🍒</span>
        <h1 className="text-xl font-semibold text-ink">Tu carrito está vacío</h1>
        <Link to="/tienda" className="mt-4 btn-ghost no-underline">Ver la tienda</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ink mb-6">🍒 Tu pedido</h1>
      <ul className="space-y-4">
        {cart.map((item) => {
          const aConsultar = !(item.price > 0);
          return (
            <li key={item.id} className="flex justify-between items-center gap-4 border-b border-night-line pb-4">
              <div className="flex items-center gap-3 min-w-0">
                <img src={item.image || placeholderFor(item.category)} alt={item.name} onError={imgFallback(item.category, item.id)}
                     className="w-16 h-16 rounded-lg object-cover bg-night-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-ink font-medium truncate">{item.name}</h3>
                  {aConsultar ? (
                    <p className="text-ink-faint text-sm">A presupuestar por WhatsApp</p>
                  ) : (
                    <p className="text-cherry-hi font-medium">{money(item.price * item.quantity)}</p>
                  )}
                  {/* Stepper de cantidad */}
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, -1)} aria-label="Restar" disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-lg border border-night-line text-ink hover:border-cherry hover:text-cherry-hi transition disabled:opacity-40 disabled:cursor-not-allowed">−</button>
                    <span className="min-w-[24px] text-center text-ink">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} aria-label="Sumar"
                            className="w-8 h-8 rounded-lg border border-night-line text-ink hover:border-cherry hover:text-cherry-hi transition">+</button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-night-600 border border-cherry-lo text-cherry-hi px-3 py-1.5 rounded-lg hover:bg-cherry hover:text-white transition text-sm self-start"
              >
                Quitar
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col items-end gap-4">
        <p className="text-2xl font-bold text-ink">Total: <span className="text-cherry-hi">{money(total)}</span></p>
        <p className="text-xs text-ink-faint text-right max-w-sm">
          {hayAConsultar && "Algunos ítems se presupuestan aparte. "}
          El precio final y el envío se confirman por WhatsApp.
        </p>
        <div className="flex gap-3 flex-wrap justify-end">
          <a href={buildWhatsApp()} target="_blank" rel="noopener noreferrer" className="btn-cherry no-underline">
            Pedir por WhatsApp
          </a>
          <Link to="/checkout" className="btn-ghost no-underline">Pago online</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
