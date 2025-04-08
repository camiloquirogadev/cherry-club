import products from "../data/products.json";
import { Link } from "react-router-dom";

const Catalogo = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo Cherry Club 🍒</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
            <img src={p.imagen} alt={p.nombre} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold">{p.nombre}</h2>
            <p className="text-pink-600 font-bold">${p.precio}</p>
            <Link to={`/producto/${p.id}`} className="mt-4 inline-block bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-xl">
              Ver producto
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
