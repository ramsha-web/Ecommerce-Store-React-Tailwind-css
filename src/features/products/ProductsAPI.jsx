// Updated ProductsAPI.js
import useSWR from "swr";
import useSWRInfinite from "swr/infinite"; // For pagination

// Fetch categories dynamically
const fetchCategories = async () => {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data;
};

// Fetch products by category
const fetchProductsByCategory = async (categoryId, limit = 10, skip = 0) => {
  const res = await fetch(`https://dummyjson.com/products/category/${categoryId}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  const data = await res.json();
  return data.products;
};

// Fetch all products (pagination)
const fetchProducts = async (limit = 10, skip = 0) => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
};

// Hook to fetch all categories
export const useCategories = () => {
  const { data, error } = useSWR(`categories`, fetchCategories);
  return { categories: data, isLoading: !error && !data, isError: error };
};

// Hook to fetch products by category
export const useProductsByCategory = (categoryId, limit = 10, skip = 0) => {
  const { data, error } = useSWR(
    categoryId ? `category-${categoryId}-${limit}-${skip}` : null,
    () => fetchProductsByCategory(categoryId, limit, skip)
  );

  return {
    products: data || [],
    isLoading: !data && !error,
    isError: !!error,
  };
};

// Hook to fetch products with pagination
export const useProducts = (limit = 10, skip = 0) => {
  const { data, error } = useSWR(`products-${limit}-${skip}`, () => fetchProducts(limit, skip));
  return { products: data, isLoading: !error && !data, isError: error };
};

// Hook for infinite loading of products by category
export const useInfiniteProductsByCategory = (categoryId, limit = 10) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.length === 0) return null;
    if (!categoryId) return null;

    const skip = pageIndex * limit;
    return `category-${categoryId}-page-${pageIndex}-limit-${limit}-skip-${skip}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products by category");
      const data = await res.json();
      return data.products;
    }
  );

  const products = data ? [].concat(...data) : [];
  const isLoading = !data && !error;
  const isError = !!error;
  const isReachingEnd = data && data[data.length - 1]?.length < limit;

  return { products, isLoading, isError, size, setSize, isReachingEnd };
};