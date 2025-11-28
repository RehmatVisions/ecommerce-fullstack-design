import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../utils/api';
import { showSuccess, showError } from '../utils/toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (addingToCart) return false; // Prevent double-click
    
    setAddingToCart(true);
    try {
      const result = await apiAddToCart(productId, quantity);
      await loadCart(); // Reload cart after adding
      showSuccess('✓ Product added to your cart successfully!');
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError(error.message || 'Failed to add product to cart');
      return false;
    } finally {
      setAddingToCart(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await apiRemoveFromCart(productId);
      await loadCart(); // Reload cart after removing
      showSuccess('✓ Product removed from your cart');
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      showError(error.message || 'Failed to remove product from cart');
      return false;
    }
  };

  const clearCart = async (showMessage = true) => {
    try {
      await apiClearCart();
      await loadCart(); // Reload cart after clearing
      if (showMessage) {
        showSuccess('✓ Your cart has been cleared successfully');
      }
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      if (showMessage) {
        showError(error.message || 'Failed to clear cart');
      }
      return false;
    }
  };

  const getCartCount = () => {
    return cart.items?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  };

  const value = {
    cart,
    loading,
    addingToCart,
    addToCart,
    removeFromCart,
    clearCart,
    loadCart,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
