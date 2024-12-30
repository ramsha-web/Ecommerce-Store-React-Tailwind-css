import useSWR from 'swr';

const fetchProducts = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products;
};

const fetchProductsByCategory = async (categoryId) => {
  const res = await fetch(`https://dummyjson.com/products/category/${categoryId}`);
  if (!res.ok) throw new Error('Failed to fetch products by category');
  const data = await res.json();
  return data.products;
};

export const useProducts = () => {
  const { data, error } = useSWR('products', fetchProducts);
  return { products: data, isLoading: !error && !data, isError: error };
};

export const useProductsByCategory = (categoryId) => {
  const { data, error } = useSWR(categoryId ? `category-${categoryId}` : null, () =>
    fetchProductsByCategory(categoryId)
  );
  return { products: data, isLoading: !error && !data, isError: error };
};
