import React from 'react';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './features/auth/AuthContext';
import { CartProvider } from './features/cart/CartContext'; 

const App = () => {
  return (
    <AuthProvider>
      <CartProvider> 
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
