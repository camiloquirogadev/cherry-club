import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";
import Hero from "./Hero";

function Home() {
  return (
    <main>
      {/* Sección principal tipo banner */}
      <Hero />

      {/* Catálogo en inicio */}
      <section id="catalogo" className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Lo más nuevo 🍒</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
