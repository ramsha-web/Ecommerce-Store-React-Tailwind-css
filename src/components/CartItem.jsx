import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '../features/cart/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="text-gray-500 font-semibold text-sm sm:text-base grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center px-4 gap-2">
      <img src={item.image} className="h-16 w-16 object-cover" alt={item.name || 'product'} />
      <p>{item.name}</p>
      <p className="hidden md:block">${item.new_price}</p>
      <button className="w-16 h-12 bg-white border border-gray-300">{item.quantity}</button>
      <p className="hidden md:block">${(item.new_price * item.quantity).toFixed(2)}</p>
      <FaTimes onClick={() => removeFromCart(item.id)} className="cursor-pointer" />
    </div>
  );
};

export default CartItem;
