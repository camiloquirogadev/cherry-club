// src/components/CategoryCard.jsx
const CategoryCard = ({ title, image, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer p-4 text-center group"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
        />
        <h3 className="text-lg font-semibold text-pink-600">{title}</h3>
      </div>
    );
  };
  
  export default CategoryCard;
  