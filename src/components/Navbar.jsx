import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaSignInAlt } from 'react-icons/fa'; 
import logo from '../assets/images/logo.png'; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo and Store Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <Link to="/" className="text-2xl font-bold">ShopEase</Link>
        </div>

        {/* Navigation Links with Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center hover:text-orange-500 space-x-1">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/cart" className="flex items-center hover:text-orange-500 space-x-1">
            <FaShoppingCart />
            <span>Cart</span>
          </Link>
          <Link to="/login" className="flex items-center hover:text-orange-500 space-x-1">
            <FaSignInAlt />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

