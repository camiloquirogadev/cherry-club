import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { asset, imgFallback, money, placeholderFor } from "../utils/placeholder";

const SIZES = {
  remeras: ["S", "M", "L", "XL", "XXL"],
  ninos: ["2", "4", "6", "8", "10", "12", "14"],
};

function Product() {
  const { id } = useParams();
  const { addToCart, updateQty } = useCart();
  const { products, loading } = useProducts();
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBlank, setShowBlank] = useState(false);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id.toString() === id);
  const sizes = product ? SIZES[product.category] : null;

  // SEO por producto
  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} · Cherry Club 🍒`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", `${product.name} — ${product.description || "Personalizado Cherry Club"}. Envíos a todo Argentina.`);
    const ld = {
      "@context": "https://schema.org", "@type": "Product",
      name: product.name, description: product.description || "",
      image: product.image ? new URL(asset(product.image), window.location.origin).href : undefined,
      category: product.category, brand: { "@type": "Brand", name: "Cherry Club" },
    };
    if (product.price > 0) ld.offers = { "@type": "Offer", price: product.price, priceCurrency: "ARS", availability: "https://schema.org/InStock", url: window.location.href };
    let tag = document.getElementById("product-jsonld");
    if (!tag) { tag = document.createElement("script"); tag.type = "application/ld+json"; tag.id = "product-jsonld"; document.head.appendChild(tag); }
    tag.textContent = JSON.stringify(ld);
    return () => { const t = document.getElementById("product-jsonld"); if (t) t.remove(); };
  }, [product]);

  useEffect(() => { if (sizes) setSize(sizes[0]); }, [id]); // eslint-disable-line

  if (loading) return <div className="p-10 text-center min-h-[50vh] text-ink-faint">Cargando… 🍒</div>;

  if (!product) {
    return (
      <div className="p-10 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-cherry-hi text-lg">Producto no encontrado.</p>
        <Link to="/tienda" className="mt-4 btn-ghost no-underline">Volver a la tienda</Link>
      </div>
    );
  }

  const aConsultar = !(product.price > 0);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const hasBlank = Boolean(product.blank);

  const handleAddToCart = () => {
    const item = { ...product };
    if (size) { item.id = `${product.id}-${size}`; item.name = `${product.name} (Talle ${size})`; }
    addToCart(item);
    if (qty > 1) updateQty(item.id, qty - 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const shareUrl = window.location.href;
  const shareText = `${product.name} — Cherry Club`;
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title: product.name, text: shareText, url: shareUrl }); } catch (_) {} }
    else window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
  };
  const copiar = async () => { try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch (_) {} };

  const currentImg = hasBlank && showBlank ? asset(product.blank) : (product.image ? asset(product.image) : placeholderFor(product.category));

  return (
    <div className="max-w-4xl mx-auto min-h-[60vh] px-6 py-6">
      {/* Breadcrumb */}
      <nav aria-label="Migas" className="text-xs text-ink-faint mb-4 flex flex-wrap gap-1">
        <Link to="/tienda" className="hover:text-cherry-hi no-underline">Tienda</Link>
        <span>/</span>
        <span className="capitalize text-ink-dim">{product.category}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Imagen + antes/después */}
        <div className="w-full md:w-1/2">
          <img
            src={currentImg}
            alt={product.name}
            onError={imgFallback(product.category, product.id)}
            className="w-full aspect-square object-cover rounded-2xl border border-night-line"
          />
          {hasBlank && (
            <div className="mt-3 flex gap-2">
              <button onClick={() => setShowBlank(false)} aria-pressed={!showBlank}
                      className={`flex-1 text-sm py-2 rounded-lg border transition ${!showBlank ? "bg-cherry text-white border-transparent" : "border-night-line text-ink-dim hover:border-cherry-lo"}`}>Sublimado</button>
              <button onClick={() => setShowBlank(true)} aria-pressed={showBlank}
                      className={`flex-1 text-sm py-2 rounded-lg border transition ${showBlank ? "bg-cherry text-white border-transparent" : "border-night-line text-ink-dim hover:border-cherry-lo"}`}>Sin sublimar</button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <span className="text-xs uppercase tracking-[2px] text-cherry-hi">{product.category}</span>
          <h1 className="font-display text-4xl text-ink mt-1">{product.name}</h1>
          <p className="text-ink-dim my-4 leading-relaxed">{product.description}</p>
          <p className="text-3xl font-semibold text-ink mb-5">{money(product.price)}</p>

          {/* Talle */}
          {sizes && !aConsultar && (
            <div className="mb-5">
              <p className="text-ink-dim text-xs uppercase tracking-wider mb-2">Talle</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} aria-pressed={size === s}
                          className={`min-w-[44px] h-11 px-3 rounded-lg border text-sm transition ${size === s ? "bg-cherry text-white border-transparent" : "border-night-line text-ink-dim hover:border-cherry-lo"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Cantidad + Agregar / Presupuesto */}
          {aConsultar ? (
            <a href={`https://wa.me/5491168060403?text=${encodeURIComponent(`Hola Cherry Club! quiero presupuestar: ${product.name}`)}`}
               target="_blank" rel="noopener noreferrer" className="btn-cherry no-underline">Pedir presupuesto</a>
          ) : (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Restar" className="w-11 h-11 rounded-lg border border-night-line text-ink hover:border-cherry hover:text-cherry-hi transition">−</button>
                <span className="min-w-[28px] text-center text-ink">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Sumar" className="w-11 h-11 rounded-lg border border-night-line text-ink hover:border-cherry hover:text-cherry-hi transition">+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-cherry">Agregar al carrito</button>
            </div>
          )}
          {added && <p className="mt-3 text-cherry-hi font-medium">Agregado al carrito ✅</p>}

          <p className="mt-5 text-xs text-ink-faint">🚚 Envíos a todo el país desde Moreno · demora de producción 3-5 días hábiles.</p>

          {/* Compartir */}
          <div className="mt-5 flex items-center gap-2 flex-wrap">
            <span className="text-ink-faint text-xs uppercase tracking-wider">Compartir:</span>
            <button onClick={share} className="text-sm border border-night-line rounded-lg px-3 py-1.5 text-ink-dim hover:border-cherry hover:text-cherry-hi transition">🔗 Compartir</button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-sm border border-night-line rounded-lg px-3 py-1.5 text-ink-dim hover:border-cherry hover:text-cherry-hi transition no-underline">WhatsApp</a>
            <button onClick={copiar} className="text-sm border border-night-line rounded-lg px-3 py-1.5 text-ink-dim hover:border-cherry hover:text-cherry-hi transition">{copied ? "¡Copiado!" : "Copiar link"}</button>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl text-ink mb-6">🍒 También te puede gustar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link to="/tienda" className="text-ink-dim hover:text-cherry-hi no-underline text-sm uppercase tracking-wider">← Seguir mirando</Link>
      </div>
    </div>
  );
}

export default Product;
