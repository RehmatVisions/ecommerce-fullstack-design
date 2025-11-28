// Import necessary components from react-router-dom for navigation
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
// Import all page components
import HomePage from './pages/HomePage'
import ProductListing from './pages/ProductListing'
import CartPage from './pages/CartPage'
import ProductDetail from './pages/ProductDetail'
import CheckoutPage from './pages/CheckoutPage'
// Import CartProvider for cart state management
import { CartProvider } from './context/CartContext'
// Import AuthProvider for authentication state management
import { AuthProvider } from './context/AuthContext'
// Import auth utilities (makes window.setTestToken available)
import './utils/auth'
// Import test functions for debugging
import './utils/testBackend'
// Import debug component
import DebugAuthStatus from './components/DebugAuthStatus'

// Navigation component - shows floating navigation buttons
const Navigation = () => {
  // Get current page location to highlight active button
  const location = useLocation()
  
  return (
    // Fixed position navigation in bottom right corner
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 shadow-2xl rounded-lg overflow-hidden">
      {/* Home page link */}
      <Link
        to="/"
        className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
          location.pathname === '/' 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
        }`}
      >
        🏠 Home
      </Link>
      
      {/* Products listing page link */}
      <Link
        to="/products"
        className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
          location.pathname === '/products' 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
        }`}
      >
        🛍️ Shop
      </Link>
      
      {/* Shopping cart page link */}
      <Link
        to="/cart"
        className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
          location.pathname === '/cart' 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
        }`}
      >
        🛒 Cart
      </Link>
    </div>
  )
}

// Main App component
const App = () => {
  return (
    // Router wraps entire app to enable navigation
    <Router>
      {/* AuthProvider wraps app to provide authentication state */}
      <AuthProvider>
        {/* CartProvider wraps app to provide cart state to all components */}
        <CartProvider>
          {/* Show navigation buttons on all pages */}
          <Navigation />
          
          {/* Debug component - shows auth/cart status (only in development) */}
          {import.meta.env.DEV && <DebugAuthStatus />}
          
          {/* Define all routes - which component shows for each URL */}
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Products listing page route */}
            <Route path="/products" element={<ProductListing />} />
            
            {/* Product detail page route (with dynamic id) */}
            <Route path="/product/:id" element={<ProductDetail />} />
            
            {/* Shopping cart page route */}
            <Route path="/cart" element={<CartPage />} />
            
            {/* Checkout page route */}
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

// Export App component so it can be used in main.jsx
export default App
