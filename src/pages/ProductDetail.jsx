import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../features/products/ProductsAPI";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, isLoading, error } = useProducts();

  const product = products?.find((item) => item.id === parseInt(id));

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading product details. Please try again later.
      </p>
    );

  if (!product)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 text-lg">Product Description is not available.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          &larr; Go back to all products
        </Link>
      </div>
    );

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline">
        &larr; Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
        <div>
          <h1 className="text-3xl font-bold text-orange-400">{product.title}</h1>
          <p className="text-lg text-gray-600 mt-4">
            {product.description || "No description available."}
          </p>

          <div className="flex justify-between items-center mt-6">
            <p className="text-2xl font-semibold text-green-500">${product.price}</p>
            <button
              className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
