import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../features/products/ProductsAPI";
import ProductCard from "../components/ProductCard";
import laptopImage from '../assets/images/Laptop.jpg';
import smartphoneImage from '../assets/images/Mobiles.jpg';
import fragranceImage from '../assets/images/fragnance.jpg';
import skincareImage from '../assets/images/skincare.jpg';

const Category = () => {
  const { category } = useParams();
  const { products, isLoading, isError } = useProductsByCategory(category);

  const categories = [
    {
      id: 'laptops',
      name: 'Laptops',
      imageUrl: laptopImage,
      description: 'Explore the latest laptops and accessories.',
    },
    {
      id: 'smartphones',
      name: 'Smartphones',
      imageUrl: smartphoneImage,
      description: 'Find the best smartphones from top brands.',
    },
    {
      id: 'fragrances',
      name: 'Fragrances',
      imageUrl: fragranceImage,
      description: 'Discover amazing fragrances for all occasions.',
    },
    {
      id: 'skincare',
      name: 'Skincare',
      imageUrl: skincareImage,
      description: 'Take care of your skin with premium skincare products.',
    },
  ];

  const currentCategory = categories.find((cat) => cat.id === category);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;
  if (!products || products.length === 0) return <p>No products found in this category.</p>;

  return (
    <div>
      {/* Category Card */}
      <div
        className="relative rounded-lg shadow-lg overflow-hidden mb-6"
        style={{
          backgroundImage: `url(${currentCategory?.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 blur-sm"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-white">
          <h2 className="text-5xl font-bold mb-4 animate-fadeIn">
            {currentCategory?.name}
          </h2>
          <p
            className="text-2xl bg-black bg-opacity-35 p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105"
          >
            {currentCategory?.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
