import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useProducts, useCategories } from "../features/products/ProductsAPI";
import laptopImage from '../assets/images/Laptop.jpg';
import smartphoneImage from '../assets/images/Mobiles.jpg';
import fragranceImage from '../assets/images/fragnance.jpg';
import skincareImage from '../assets/images/skincare.jpg';
import watchImage from '../assets/images/Watches.jpg';
import cameraImage from '../assets/images/Camera.jpg';

const Home = () => {
  const [page, setPage] = useState(0);
  const limit = 15;
  const skip = page * limit;

  // Fetch products and categories
  const { products, isLoading: productsLoading, isError: productsError } = useProducts(limit, skip);
  const { categories, isLoading: categoriesLoading, isError: categoriesError } = useCategories();

  const ProductCardRef = useRef(null);
  const totalPages = 15;

  const handlePageChange = (pageNumber) => setPage(pageNumber);
  const categoriesList = [
    { id: 'laptops', name: 'Laptops', imageUrl: laptopImage, description: 'Explore the latest laptops and accessories.' },
    { id: 'smartphones', name: 'Smartphones', imageUrl: smartphoneImage, description: 'Find the best smartphones from top brands.' },
    { id: 'fragrances', name: 'Fragrances', imageUrl: fragranceImage, description: 'Discover amazing fragrances for all occasions.' },
    { id: 'skincare', name: 'Skincare', imageUrl: skincareImage, description: 'Take care of your skin with premium skincare products.' },
    { id: 'watches', name: 'Watches', imageUrl: watchImage, description: 'Shop the latest collection of stylish and durable watches.' },
    { id: 'cameras', name: 'Cameras', imageUrl: cameraImage, description: 'Capture your moments with top-of-the-line cameras.' },
  ];

  const limitedCategories = categoriesList.slice(0, 6);

  if (productsLoading || categoriesLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (productsError || categoriesError)
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error loading data!
      </div>
    );

  return (
    <div className="space-y-16">
      <Hero productSectionRef={ProductCardRef} />

      {/* Categories Section */}
      <section className="container mx-auto px-12 mb-16">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center items-center">
          {limitedCategories.map((category) => (
            <div key={category.id} className="relative rounded-lg overflow-hidden shadow-lg flex flex-col items-center">
              <div
                className="w-full h-56  bg-cover bg-center"
                style={{ backgroundImage: `url(${category.imageUrl})` }}
              ></div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-500 mb-4">{category.description}</p>
                <Link
                  to={`/category/${category.id}`}
                  className="inline-block text-white bg-orange-500 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 mb-16" ref={ProductCardRef}>
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 mb-7 space-x-2 text-lg text-gray-800">
          <button
            onClick={() => handlePageChange(Math.max(0, page - 1))}
            disabled={page === 0}
            className={`${page === 0 ? "text-gray-400 cursor-default" : "text-gray-500"}`}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            if (index === 3) {
              return (
                <span key={index} className="text-gray-500">
                  ...
                </span>
              );
            }
            if (index > 3) return null;
            return (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`${page === index ? "font-bold text-gray-700" : "text-gray-800"}`}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className={`${page === totalPages - 1 ? "text-gray-400 cursor-default" : "text-gray-500"}`}
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
