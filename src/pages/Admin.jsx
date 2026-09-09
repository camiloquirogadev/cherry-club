import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, SUPABASE_ENABLED, PRODUCTS_TABLE, IMAGES_BUCKET } from "../lib/supabase";
import { CATS } from "../components/Catalog";
import { money } from "../utils/placeholder";

const EMPTY = { name: "", category: "remeras", description: "", price: "", image_url: "", blank_url: "", featured: false };
const CATEGORIES = CATS.filter((c) => c.id !== "todos");
const inputCls =
  "w-full p-2.5 rounded-lg bg-night-700 border border-night-line text-ink placeholder-ink-faint focus:border-cherry outline-none transition";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [blankFile, setBlankFile] = useState(null);
  const [msg, setMsg] = useState("");

  // ── Sesión ──
  useEffect(() => {
    if (!SUPABASE_ENABLED) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadProducts();
  }, [session]);

  async function loadProducts() {
    const { data } = await supabase.from(PRODUCTS_TABLE).select("*").order("created_at", { ascending: true });
    setProducts(data || []);
  }

  async function signIn(e) {
    e.preventDefault();
    setAuthError(""); setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setBusy(false);
  }
  async function signOut() { await supabase.auth.signOut(); }

  function editProduct(p) {
    setEditingId(p.id);
    setForm({ name: p.name, category: p.category, description: p.description || "", price: p.price ?? "", image_url: p.image_url || p.image || "", blank_url: p.blank_url || "", featured: !!p.featured });
    setFile(null); setBlankFile(null); setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function resetForm() { setEditingId(null); setForm(EMPTY); setFile(null); setBlankFile(null); }

  async function uploadOne(f, current) {
    if (!f) return current;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      throw new Error("Solo se permiten imágenes JPG, PNG o WebP.");
    }
    if (f.size > 5 * 1024 * 1024) {
      throw new Error("Cada imagen debe pesar como máximo 5 MB.");
    }
    const ext = f.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(IMAGES_BUCKET).upload(path, f, { upsert: true, cacheControl: "3600" });
    if (error) throw error;
    const { data } = supabase.storage.from(IMAGES_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async function saveProduct(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const image_url = await uploadOne(file, form.image_url);
      const blank_url = await uploadOne(blankFile, form.blank_url);
      const payload = {
        name: form.name,
        category: form.category,
        description: form.description,
        price: Number(form.price) || 0,
        image_url,
        blank_url,
        featured: form.featured,
      };
      let error;
      if (editingId) ({ error } = await supabase.from(PRODUCTS_TABLE).update(payload).eq("id", editingId));
      else ({ error } = await supabase.from(PRODUCTS_TABLE).insert(payload));
      if (error) throw error;
      setMsg(editingId ? "Producto actualizado ✅" : "Producto agregado ✅");
      resetForm();
      loadProducts();
    } catch (err) {
      setMsg("Error: " + err.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteProduct(id) {
    if (!confirm("¿Borrar este producto?")) return;
    const { error } = await supabase.from(PRODUCTS_TABLE).delete().eq("id", id);
    if (!error) loadProducts();
  }

  // ── Sin configurar ──
  if (!SUPABASE_ENABLED) {
    return (
      <div className="max-w-xl mx-auto p-8 min-h-[60vh]">
        <h1 className="font-display text-4xl text-ink mb-4">🍒 Panel</h1>
        <p className="text-ink-dim mb-4">
          El panel necesita Supabase configurado. Seguí los pasos del <strong className="text-cherry-hi">README</strong> (sección Supabase):
          crear el proyecto, correr <code>supabase/setup.sql</code> y poner las claves en un archivo <code>.env</code>.
        </p>
        <Link to="/" className="btn-ghost no-underline">Volver a la tienda</Link>
      </div>
    );
  }

  // ── Login ──
  if (!session) {
    return (
      <div className="max-w-sm mx-auto p-8 min-h-[60vh]">
        <h1 className="font-display text-4xl text-ink mb-6 text-center">🍒 Ingreso</h1>
        <form onSubmit={signIn} className="space-y-4">
          <input className={inputCls} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className={inputCls} type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {authError && <p className="text-cherry-hi text-sm">{authError}</p>}
          <button className="btn-cherry w-full text-center" disabled={busy}>{busy ? "Entrando…" : "Ingresar"}</button>
        </form>
        <p className="text-ink-faint text-xs mt-4 text-center">Acceso solo para la dueña de Cherry Club.</p>
      </div>
    );
  }

  // ── Panel ──
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[70vh]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-4xl text-ink">🍒 Panel de productos</h1>
        <button onClick={signOut} className="btn-ghost">Salir</button>
      </div>

      <form onSubmit={saveProduct} className="bg-night-700 border border-night-line rounded-2xl p-5 mb-8 grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2 text-cherry-hi uppercase tracking-wider text-xs">
          {editingId ? "Editar producto" : "Nuevo producto"}
        </div>
        <input className={inputCls} placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <input className={inputCls} type="number" placeholder="Precio (0 = a consultar)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <label className="flex items-center gap-2 text-ink-dim text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Destacado ★
        </label>
        <textarea className={`${inputCls} md:col-span-2`} rows="2" placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div>
          <label className="block text-ink-dim text-sm mb-1">Foto (sublimada)</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-ink-dim text-sm" />
          {form.image_url && !file && <p className="text-ink-faint text-xs mt-1 truncate">Actual: {form.image_url}</p>}
        </div>
        <div>
          <label className="block text-ink-dim text-sm mb-1">Foto sin sublimar (opcional)</label>
          <input type="file" accept="image/*" onChange={(e) => setBlankFile(e.target.files[0])} className="text-ink-dim text-sm" />
          {form.blank_url && !blankFile && <p className="text-ink-faint text-xs mt-1 truncate">Actual: {form.blank_url}</p>}
        </div>
        <div className="md:col-span-2 flex gap-3 items-center">
          <button className="btn-cherry" disabled={busy}>{busy ? "Guardando…" : editingId ? "Guardar cambios" : "Agregar producto"}</button>
          {editingId && <button type="button" onClick={resetForm} className="btn-ghost">Cancelar</button>}
          {msg && <span className="text-sm text-ink-dim">{msg}</span>}
        </div>
      </form>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 bg-night-800 border border-night-line rounded-xl p-3">
            <img src={p.image_url || p.image || ""} alt="" className="w-14 h-14 rounded-lg object-cover bg-night-600 flex-shrink-0" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
            <div className="flex-1 min-w-0">
              <p className="text-ink truncate">{p.name} {p.featured && <span className="text-cherry-hi">★</span>}</p>
              <p className="text-ink-faint text-sm">{p.category} · {money(p.price)}</p>
            </div>
            <button onClick={() => editProduct(p)} className="text-ink-dim hover:text-cherry-hi text-sm px-2">Editar</button>
            <button onClick={() => deleteProduct(p.id)} className="text-ink-dim hover:text-cherry-hi text-sm px-2">Borrar</button>
          </div>
        ))}
        {products.length === 0 && <p className="text-ink-faint text-center py-8">Todavía no hay productos. Agregá el primero 🍒</p>}
      </div>
    </div>
  );
}
