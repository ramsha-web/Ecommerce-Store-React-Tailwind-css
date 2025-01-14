import React from "react";
import { Link } from "react-router-dom";

// Category Card Component
const CategoryCard = ({ category }) => {
  return (
    <div className="relative group rounded-lg shadow-lg p-6 mb-6 bg-white overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-teal-800 to-gray-800 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

      <div className="relative z-10 text-gray-800 font-bold text-xl mb-2">
        {category.name}
      </div>

      <p className="relative z-10 text-gray-600 mb-4">
        {category.description || "Explore the best products in this category."}
      </p>

      <div className="relative z-10">
        <Link
          to={`/category/${category.id}`} 
          className="inline-block text-white bg-orange-500 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
        >
          View Products
        </Link>
      </div>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${category.imageUrl})` }}></div>

      <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-orange-500 transition-all duration-300"></div>
    </div>
  );
};

export default CategoryCard;
