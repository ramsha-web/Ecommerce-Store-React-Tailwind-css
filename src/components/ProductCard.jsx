import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../features/cart/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 
import { toast } from "react-toastify"; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Show success toast notification
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full  mb-6">

      <div className="relative">
        <img
          src={product.thumbnail || product.image || product.images[0]}
          alt={product.title}
          className="w-full h-56 object-cover rounded-t-lg transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-black-800 group-hover:text-orange-500 transition-colors duration-300">
          {product.title}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center mt-2">
          {renderRating(product.rating || 0)}
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2 hover:text-gray-800 transition-all duration-300">
          {product.description}
        </p>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-800">
            ${product.price}
          </span>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="text-orange-500 hover:text-orange-600 transition-all duration-300 p-2 rounded-full hover:bg-orange-100"
            aria-label="Add to Cart"
          >
            <FaShoppingCart size={24} />
          </button>
        </div>

        {/* View Product Detail Link */}
        <div className="mt-4">
          <Link
            to={`/product/${product.id}`} 
            className="text-orange-600 hover:text-orange-700 transition-all duration-300 underline"
          >
            View Product Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
