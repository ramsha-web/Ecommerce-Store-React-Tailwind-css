import React from "react";
import { useCart } from "../features/cart/CartContext";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-32">
      <div className="max-w-7xl mx-auto my-10 p-4">
        {cart.length === 0 ? (
          <div className="flex items-center justify-center">
            <p>Your cart is empty. Please add products to proceed to checkout.</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center px-4">
              <p>Products</p>
              <p>Title</p>
              <p className="hidden md:block">Price</p>
              <p className="hidden md:block">Quantity</p>
              <p className="hidden md:block">Total</p>
              <p className="hidden md:block">Remove</p>
            </div>
            <hr className="bg-gray-300 border-0 h-[2px] my-2" />

            {/* Cart Items */}
            {cart.map((item) => (
              <div key={item.id}>
                <div className="text-gray-500 font-semibold text-sm sm:text-base grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center px-4 gap-2">
                  <img
                    src={item.thumbnail || item.image || item.images[0]}
                    className="h-16 w-16 object-cover"
                    alt={item.title}
                  />
                  <p>{item.title}</p>
                  <p className="hidden md:block">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className=" text-gray-800 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = Math.max(1, Number(e.target.value)); 
                        updateQuantity(item.id, newQuantity);
                      }}
                      className="w-16 h-10 text-center border border-gray-300 rounded"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className=" text-gray-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <p className="hidden md:block">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <FaTimes
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                  />
                </div>
                <hr className="bg-gray-300 border-0 h-[2px] my-2" />
              </div>
            ))}

            {/* Cart Totals Section */}
            <div className="flex flex-col lg:flex-row my-12 gap-10 md:gap-32">
              {/* Totals */}
              <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-lg font-bold">Cart Totals</h1>
                <div>
                  <div className="flex justify-between py-2">
                    <p>Subtotal</p>
                    <p>${totalAmount.toFixed(2)}</p>
                  </div>
                  <hr className="bg-gray-300 border-0 h-[2px] mt-2" />
                  <div className="flex justify-between py-2">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                  </div>
                  <hr className="bg-gray-300 border-0 h-[2px] my-2" />
                  <div className="flex justify-between text-xl font-semibold py-2">
                    <h3>Total</h3>
                    <h3>${totalAmount.toFixed(2)}</h3>
                  </div>
                  {/* Proceed to Checkout Button */}
                  <Link to="/login">
                    <button className="w-full lg:w-64 h-14 bg-green-500 text-white font-semibold text-lg mt-4">
                      PROCEED TO CHECKOUT
                    </button>
                  </Link>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="flex-1 w-full text-lg font-semibold">
                <p className="text-gray-600">
                  If you have a promo code, enter it here:
                </p>
                <div className="w-full lg:w-80 mt-2 flex">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="flex-1 h-14 p-2 bg-gray-200 rounded-l-md focus:outline-none"
                  />
                  <button className="h-14 w-32 bg-black text-white rounded-r-md hover:bg-gray-700">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
