import { useCart } from "../context/CartContext";
import products from "../data/products.json";
import { useState } from "react";

const ProductList = () => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
        Todos los Productos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(0, 15).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-pink-600 font-bold mt-1">${product.price}</p>
            <button
              onClick={() => handleAdd(product)}
              className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-medium transition"
            >
              Agregar al carrito
            </button>
            {addedId === product.id && (
              <p className="mt-2 text-green-600 text-sm">
                Producto agregado al carrito ✅
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
