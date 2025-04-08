import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";

function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id.toString() === id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">
        Producto no encontrado.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 object-cover rounded shadow"
      />
      <div>
        <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
        <p className="text-gray-600 my-4">{product.description}</p>
        <p className="text-xl font-semibold text-green-600 mb-4">
          ${product.price}
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Agregar al carrito
        </button>

        {added && (
          <p className="mt-3 text-green-600 font-medium">
            Producto agregado al carrito ✅
          </p>
        )}
      </div>
    </div>
  );
}

export default Product;
