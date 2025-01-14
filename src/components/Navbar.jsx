import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaBars, FaPhone, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../features/auth/AuthContext";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo and Store Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <Link to="/" className="text-2xl font-bold">
            ShopEase
          </Link>
        </div>

        <button
          className="text-3xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <FaBars />
        </button>
        <div
          className={`absolute top-16 left-0 w-full bg-gray-800 md:static md:flex md:flex-row md:space-x-4 md:w-auto transition-transform duration-300 ${
            isOpen ? "block" : "hidden md:block"
          }`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 py-2 px-4 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center space-x-1 py-2 px-4 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-1 py-2 px-4 hover:text-orange-500"
              >
                <FaUser />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 py-2 px-4 hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                <FaUser />
                <span>Login</span>
              </Link>
            )}
            <Link
              to="/contact"
              className="flex items-center space-x-1 py-2 px-4 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              <FaPhone />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
