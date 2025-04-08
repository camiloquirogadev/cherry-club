import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
 
function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-3 text-pink-700">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-green-700 font-bold mb-4">${product.price}</p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto"
      >
        <Link
          to={`/producto/${product.id}`}
          className="block bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded text-center"
        >
          Ver producto
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default ProductCard;
