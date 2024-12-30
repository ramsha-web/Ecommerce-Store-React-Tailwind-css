import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '../features/cart/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, removeFromCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  return (
    <div className="mt-32">
      <div className="max-w-7xl mx-auto my-10 p-4">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center">
            <p>Your cart is empty. Add items to proceed to checkout.</p>
          </div>
        ) : (
          <div>
            <div className="flex font-semibold mb-4">
              <span className="flex-1">Product</span>
              <span className="flex-1 text-center">Price</span>
              <span className="flex-1 text-center">Quantity</span>
              <span className="flex-1 text-center">Total</span>
              <span className="flex-1 text-center">Remove</span> 
            </div>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <img
                  src={item.thumbnail || item.image || item.images[0]}
                  alt={item.title}
                  className="h-16 w-16 object-cover mr-4"
                />
                <p className="flex-1">{item.title}</p>
                <p className="flex-1 text-center">${item.price}</p>
                <div className="flex-1 text-center">
                  <div className="w-16 h-8 border border-gray-300 flex items-center justify-center">{item.quantity}</div>
                </div>
                <p className="flex-1 text-center">${(item.price * item.quantity).toFixed(2)}</p>
                <FaTimes
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer text-gray-500 ml-4"
                />
              </div>
            ))}
            <div className="flex justify-between my-8">
              <h3 className="text-lg font-bold">Subtotal: ${totalAmount.toFixed(2)}</h3>
              <h3 className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</h3>
            </div>
            <Link to="/login">
              <button className="bg-green-500 text-white px-6 py-3 rounded">Proceed to Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
