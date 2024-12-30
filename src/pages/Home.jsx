import React from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { useProducts } from "../features/products/ProductsAPI";

const categories = [
  { id: "smartphones", name: "Smartphones" },
  { id: "laptops", name: "Laptops" },
  { id: "fragrances", name: "Fragrances" },
  { id: "skincare", name: "Skincare" },
];

const Home = () => {
  const { products, isLoading, isError } = useProducts();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error loading products!
      </div>
    );

  return (
    <div className="space-y-16">
      <Hero />

      {/* Category Section */}
      <section className="p-4">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10 transition-transform duration-500 animate-bounceIn">
          Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Product Section */}
      <section className="p-4">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10 transition-transform duration-500 animate-fadeIn">
          All Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
