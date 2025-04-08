import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

function Home() {
  return (
    <div>
      <section
  className="bg-cover bg-center h-[70vh] flex items-center justify-center text-white text-center"
  style={{ backgroundImage: "url('/img/logo.png')" }}
>
  <div className="bg-black bg-opacity-40 p-6 rounded">
    <h1 className="text-4xl font-bold mb-4">¡Cherry Club te da la bienvenida!</h1>
    <a
      href="#catalogo"
      className="no-underline hover:no-underline bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded font-semibold transition"
    >
      Productos
    </a>
  </div>
</section>

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