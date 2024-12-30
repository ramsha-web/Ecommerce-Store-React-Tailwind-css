import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CartPage from '../pages/Cart';  
import Checkout from '../pages/Checkout';
import ProductDetail from '../pages/ProductDetail';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import Category from '../pages/Category';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
