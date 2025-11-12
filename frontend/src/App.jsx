// Import necessary components from react-router-dom for navigation
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
// Import all page components
import HomePage from './pages/HomePage'
import ProductListing from './pages/ProductListing'
import CartPage from './pages/CartPage'
import ProductDetail from './pages/ProductDetail'

// Navigation component - shows floating navigation buttons
const Navigation = () => {
  // Get current page location to highlight active button
  const location = useLocation()
  
  return (
    // Fixed position navigation in bottom right corner
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* Home page link */}
      <Link
        to="/"
        className={`px-4 py-2 rounded shadow-lg text-sm ${
          location.pathname === '/' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
      >
        Home
      </Link>
      
      {/* Products listing page link */}
      <Link
        to="/products"
        className={`px-4 py-2 rounded shadow-lg text-sm ${
          location.pathname === '/products' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
      >
        Listing
      </Link>
      
      {/* Product detail page link */}
      <Link
        to="/product/1"
        className={`px-4 py-2 rounded shadow-lg text-sm ${
          location.pathname.startsWith('/product') ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
      >
        Detail
      </Link>
      
      {/* Shopping cart page link */}
      <Link
        to="/cart"
        className={`px-4 py-2 rounded shadow-lg text-sm ${
          location.pathname === '/cart' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
        }`}
      >
        Cart
      </Link>
    </div>
  )
}

// Main App component
const App = () => {
  return (
    // Router wraps entire app to enable navigation
    <Router>
      {/* Show navigation buttons on all pages */}
      <Navigation />
      
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
      </Routes>
    </Router>
  )
}

// Export App component so it can be used in main.jsx
export default App
