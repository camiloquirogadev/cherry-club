import { useParams } from "react-router-dom";
import products from "../data/products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const producto = products.find(p => p.id.toString() === id);

  if (!producto) {
    return <div className="p-4 text-center text-red-500">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-auto rounded-xl shadow" />
      <div>
        <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
        <p className="text-lg text-gray-700 mb-4">{producto.descripcion}</p>
        <p className="text-2xl font-semibold text-pink-600 mb-4">${producto.precio}</p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-xl">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
