import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";
import Hero from "./Hero";

function Home() {
  return (
    <div>
      <Hero />

      {/* Catálogo */}
      <section
        id="catalogo"
        className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Home;
