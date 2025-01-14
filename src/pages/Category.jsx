import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../features/products/ProductsAPI";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const Category = () => {
  const { category } = useParams();
  const { products, isLoading, isError } = useProductsByCategory(category);

  const [sortOrder, setSortOrder] = useState("");

  // Handle sorting
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else if (sortOrder === "high-to-low") {
      return b.price - a.price; 
    }
    return 0;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;
  if (!products || products.length === 0) return <p>No products found in this category.</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Filter Section */}
      <div className="flex justify-end mb-4">
        <select
          className="border border-gray-300 rounded px-4 py-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
