// Import React and necessary hooks
import React, { useState } from 'react';
// Import authentication and cart functions
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
// Import icons for better UI
import { FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';

// Login Modal Component
// Props: isOpen (show/hide), onClose (close modal), onSwitchToRegister (switch to register form)
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  
  // State variables to store form data
  const [email, setEmail] = useState('');           // User's email
  const [password, setPassword] = useState('');     // User's password
  const [error, setError] = useState('');           // Error message if login fails
  const [loading, setLoading] = useState(false);    // Loading state during login
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  
  // Get login function from auth context
  const { login } = useAuth();
  // Get loadCart function to refresh cart after login
  const { loadCart } = useCart();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');       // Clear any previous errors
    setLoading(true);   // Show loading state

    // Try to login with email and password
    const result = await login({ email, password });
    
    // Check if login was successful
    if (result.success) {
      await loadCart();  // Reload user's cart
      onClose();         // Close the modal
      setEmail('');      // Clear email field
      setPassword('');   // Clear password field
    } else {
      // Show error message if login failed
      setError(result.error || 'Login failed');
    }
    
    setLoading(false); // Hide loading state
  };

  // Don't show modal if isOpen is false
  if (!isOpen) return null;

  return (
    // Dark overlay that covers the whole screen
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close modal when clicking outside
    >
      {/* Modal container - white box in center */}
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        
        {/* Blue header section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl p-6">
          <div className="flex justify-between items-center">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Welcome Back</h2>
              <p className="text-blue-100 text-sm">Login to your account</p>
            </div>
            
            {/* Close button */}
            <button 
              onClick={onClose} 
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-300"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Form content area */}
        <div className="p-8">
          
          {/* Show error message if login fails */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                {/* Email icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <FaEnvelope className="text-gray-400" />
                </div>
                {/* Email input box */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email when user types
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                {/* Lock icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <FaLock className="text-gray-400" />
                </div>
                {/* Password input box */}
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password when user types
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
                {/* Show/Hide password button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="w-full bg-blue-500 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-300"
            >
              {loading ? 'Logging in...' : 'Login to Account'}
            </button>
          </form>

          {/* Divider line */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to our platform?</span>
            </div>
          </div>

          {/* Switch to Register Button */}
          <button
            onClick={onSwitchToRegister}
            className="w-full border-2 border-blue-500 text-blue-500 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
