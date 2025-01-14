import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-32" />
          </Link>
          <p className="mt-2 text-sm">Your one-stop shop for quality products at unbeatable prices.</p>
          <p className="mt-2 text-sm">456 ShopEase Ave, Tech City, CA 90210</p>
          <p className="text-sm">Email: support@shopease.com</p>
          <p className="text-sm">Phone: (987) 654-3210</p>
        </div>

        {/* Customer Service Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/shipping">Shipping & Returns</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/order-tracking">Order Tracking</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <Link to="https://facebook.com" aria-label="Facebook" className="hover:text-blue-500">
              <FaFacebook />
            </Link>
            <Link to="https://instagram.com" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </Link>
            <Link to="https://twitter.com" aria-label="Twitter" className="hover:text-blue-400">
              <FaTwitterSquare />
            </Link>
            <Link to="https://pinterest.com" aria-label="Pinterest" className="hover:text-red-600">
              <FaPinterest />
            </Link>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm">Subscribe to get special offers, free giveaways, and more</p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md bg-gray-100 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button type="submit" className="bg-orange-600 text-white px-4 rounded-r-md hover:bg-orange-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-orange-500">ShopEase</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
