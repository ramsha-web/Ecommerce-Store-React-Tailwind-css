import { useParams } from "react-router-dom";
import { useProducts } from "../features/products/ProductsAPI";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, isLoading, error } = useProducts();

  const product = products?.find((item) => item.id === parseInt(id));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
      <div>
        <h1 className="text-3xl font-bold text-orange-400">{product.title}</h1>
        <p className="text-lg text-gray-400 mt-4">{product.description}</p>

        <div className="flex justify-between items-center mt-6">
          <p className="text-2xl font-semibold text-green-400">${product.price}</p>
          <button
            className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
};

export default ProductDetail;
