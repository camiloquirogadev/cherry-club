import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-pink-100 py-12 text-center px-4">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">
          Bienvenid@ a Cherry Club 🍒
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Sublimamos tus ideas en remeras, tazas y mucho más
        </p>
        <a
          href="#catalogo"
          className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded font-semibold"
        >
          Ver productos
        </a>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Home;
