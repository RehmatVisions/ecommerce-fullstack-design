// ==========================================
// MAIN APP COMPONENT
// ==========================================
// This is the root component of the admin panel
// It handles routing (navigation between pages) and authentication

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all page components
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

// Import authentication helper
import { isAdminLoggedIn } from './api';

// ==========================================
// PROTECTED ROUTE COMPONENT
// ==========================================
// This component wraps pages that require authentication
// If user is not logged in, they are redirected to login page

const ProtectedRoute = ({ children }) => {
  // State to track authentication status
  // null = checking, true = authenticated, false = not authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check authentication status when component loads
  useEffect(() => {
    setIsAuthenticated(isAdminLoggedIn());
  }, []);

  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  // If authenticated, show the protected page
  // If not authenticated, redirect to login page
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

function App() {
  return (
    <>
      {/* Router handles navigation between pages */}
      <Router>
        <Routes>
          {/* PUBLIC ROUTES - Anyone can access these */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES - Only authenticated admins can access */}
          
          {/* Dashboard - Main admin page */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Products List - View all products */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          {/* Add Product - Create new product */}
          <Route
            path="/products/add"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          {/* Edit Product - Update existing product */}
          <Route
            path="/products/edit/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      {/* Toast Notification Container - Shows success/error messages */}
      <ToastContainer
        position="top-right"        // Position in top-right corner
        autoClose={3000}            // Auto close after 3 seconds
        hideProgressBar={false}     // Show progress bar
        newestOnTop={true}          // New toasts appear on top
        closeOnClick                // Close when clicked
        rtl={false}                 // Left-to-right text direction
        pauseOnFocusLoss            // Pause timer when window loses focus
        draggable                   // Allow dragging to dismiss
        pauseOnHover                // Pause timer when hovering
        theme="light"               // Light theme
      />
    </>
  );
}

export default App;
