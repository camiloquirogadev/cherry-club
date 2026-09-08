import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { money } from "../utils/placeholder";
import { cartWeightGrams, fetchQuote } from "../lib/shipping";
import { supabase, SUPABASE_ENABLED } from "../lib/supabase";

const WHATSAPP = "5491168060403";
// Solo el alias para la transferencia; el CBU se coordina por WhatsApp al confirmar.
const ALIAS = "tienda.cherry.club";

export default function Checkout() {
  const { cart, clearCart, showToast } = useCart();
  const [pago, setPago] = useState("transfer");
  const [entrega, setEntrega] = useState("envio");
  const [cp, setCp] = useState("");
  const [quote, setQuote] = useState(null);
  const [rateIdx, setRateIdx] = useState(0);
  const [quoting, setQuoting] = useState(false);
  const [envioMsg, setEnvioMsg] = useState("");
  const [confirmado, setConfirmado] = useState(null);

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const grams = cartWeightGrams(cart);
  const rate = quote && quote.rates[rateIdx];
  const costoEnvio = entrega === "retiro" ? 0 : (rate ? rate.price : 0);
  const total = subtotal + costoEnvio;

  async function calcularEnvio() {
    setEnvioMsg(""); setQuote(null); setQuoting(true);
    const q = await fetchQuote(cp, grams);
    setQuoting(false);
    if (!q) { setEnvioMsg("Ingresá un código postal válido."); return; }
    setQuote(q); setRateIdx(0);
  }

  const copiar = async (text, label) => {
    try { await navigator.clipboard.writeText(text); showToast(`${label} copiado 🍒`); } catch { /* ignore */ }
  };

  const handleMercadoPago = async () => {
    if (!SUPABASE_ENABLED) { showToast("Pago con tarjeta no activo — coordiná por WhatsApp/transferencia"); return; }
    try {
      const { data, error } = await supabase.functions.invoke("crear-preferencia", { body: { items: cart, envio: costoEnvio } });
      if (error || !data || !data.init_point) { showToast((data && data.error) || "Pago con tarjeta no activo por ahora"); return; }
      window.location.href = data.init_point;
    } catch { showToast("Pago con tarjeta no activo por ahora"); }
  };

  const confirmarTransferencia = () => {
    const items = cart.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price }));
    setConfirmado({ items, subtotal, envio: costoEnvio, total, entrega });
    clearCart();
  };

  const comprobanteWhatsApp = () => {
    if (!confirmado) return "#";
    let msg = "Hola Cherry Club! hice la transferencia de mi pedido:\n\n";
    confirmado.items.forEach((i) => {
      msg += `- ${i.quantity}x ${i.name}` + (i.price > 0 ? ` — ${money(i.price * i.quantity)}` : " — a consultar") + "\n";
    });
    if (confirmado.total > 0) msg += `\nTotal: ${money(confirmado.total)}`;
    msg += "\n\nAdjunto el comprobante.";
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  };

  // ── Confirmación ──
  if (confirmado) {
    return (
      <div className="p-6 max-w-lg mx-auto min-h-[60vh] text-center">
        <span className="text-5xl">🍒</span>
        <h1 className="font-display text-4xl text-ink mt-3 mb-2">¡Gracias por tu compra!</h1>
        <p className="text-ink-dim mb-6">Enviá el comprobante por WhatsApp para confirmar y coordinar el envío.</p>
        <div className="bg-night-700 border border-night-line rounded-xl p-4 text-left mb-6">
          <ul className="text-ink-dim text-sm space-y-1 mb-3">
            {confirmado.items.map((i, n) => (
              <li key={n}>{i.quantity}x {i.name} {i.price > 0 && `— ${money(i.price * i.quantity)}`}</li>
            ))}
          </ul>
          {confirmado.total > 0 && <p className="text-ink font-semibold">Total: {money(confirmado.total)}</p>}
        </div>
        <a href={comprobanteWhatsApp()} target="_blank" rel="noopener noreferrer" className="btn-cherry w-full text-center no-underline">
          Enviar comprobante por WhatsApp
        </a>
        <div className="mt-4"><Link to="/" className="text-ink-dim hover:text-cherry-hi no-underline text-sm">Volver al inicio</Link></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold text-ink">Tu carrito está vacío</h1>
        <Link to="/tienda" className="mt-4 btn-ghost no-underline">Ver la tienda</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto min-h-[60vh]">
      <h1 className="font-display text-4xl text-ink mb-6">🍒 Resumen del pedido</h1>
      <ul className="mb-4 space-y-1 text-ink-dim">
        {cart.map((item) => (
          <li key={item.id}>{item.name} × {item.quantity} = {item.price > 0 ? money(item.price * item.quantity) : "a consultar"}</li>
        ))}
      </ul>

      {/* ── Envío ── */}
      <div className="bg-night-700 border border-night-line rounded-xl p-4 mb-5">
        <p className="font-semibold text-ink uppercase tracking-wider text-xs mb-3">Entrega</p>
        <div className="flex flex-col gap-2 mb-3">
          <label className="flex items-center gap-2 text-ink-dim text-sm">
            <input type="radio" name="entrega" checked={entrega === "envio"} onChange={() => setEntrega("envio")} />
            Envío por Correo Argentino (desde Moreno, BA)
          </label>
          <label className="flex items-center gap-2 text-ink-dim text-sm">
            <input type="radio" name="entrega" checked={entrega === "retiro"} onChange={() => setEntrega("retiro")} />
            Retiro en persona (gratis, se coordina por WhatsApp)
          </label>
        </div>

        {entrega === "envio" && (
          <p className="text-ink-faint text-xs">
            El envío por Correo Argentino se cotiza según tu domicilio y lo coordinamos por WhatsApp al confirmar el pedido.
          </p>
        )}
      </div>

      {/* ── Totales ── */}
      <div className="text-ink-dim text-sm space-y-1 mb-4">
        <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex justify-between"><span>Envío</span><span>{entrega === "retiro" ? "Gratis" : "a coordinar"}</span></div>
      </div>
      <p className="text-xl font-semibold text-ink mb-2">Total: <span className="text-cherry-hi">{money(total)}</span></p>
      <p className="text-xs text-ink-faint mb-6">🕒 Demora de producción estimada: 3 a 5 días hábiles. Envíos a todo el país.</p>

      {/* ── Pago ── */}
      <label className="block font-semibold mb-2 text-ink uppercase tracking-wider text-xs">Método de pago</label>
      <select value={pago} onChange={(e) => setPago(e.target.value)}
              className="bg-night-700 border border-night-line text-ink rounded-lg px-3 py-2 w-full mb-4 focus:border-cherry outline-none">
        <option value="transfer">Transferencia bancaria</option>
        <option value="mp">MercadoPago</option>
      </select>

      {pago === "mp" ? (
        <button onClick={handleMercadoPago} className="btn-cherry w-full text-center">Pagar con MercadoPago</button>
      ) : (
        <div className="bg-night-700 border border-night-line p-4 rounded-xl">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-ink-dim text-sm">Alias: <strong className="text-ink">{ALIAS}</strong></span>
            <button onClick={() => copiar(ALIAS, "Alias")} className="text-xs border border-night-line rounded-lg px-2 py-1 text-ink-dim hover:text-cherry-hi hover:border-cherry-lo transition">Copiar</button>
          </div>
          <p className="text-ink-faint text-xs mb-4">Te pasamos el CBU por WhatsApp al confirmar el pedido.</p>
          <button onClick={confirmarTransferencia} className="btn-cherry w-full text-center">Ya hice la transferencia</button>
        </div>
      )}
    </div>
  );
}
