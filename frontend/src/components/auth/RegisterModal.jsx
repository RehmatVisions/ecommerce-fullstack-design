// Import React and necessary hooks
import React, { useState } from 'react';
// Import authentication and cart functions
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
// Import icons for better UI
import { FaUser, FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';

// Register Modal Component
// Props: isOpen (show/hide), onClose (close modal), onSwitchToLogin (switch to login form)
const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  
  // State variables to store form data
  const [name, setName] = useState('');                     // User's name
  const [email, setEmail] = useState('');                   // User's email
  const [password, setPassword] = useState('');             // User's password
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password
  const [adminSecret, setAdminSecret] = useState('');       // Admin secret (optional - only for admin registration)
  const [error, setError] = useState('');                   // Error message if registration fails
  const [loading, setLoading] = useState(false);            // Loading state during registration
  
  // Get register function from auth context
  const { register } = useAuth();
  // Get loadCart function to refresh cart after registration
  const { loadCart } = useCart();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');       // Clear any previous errors

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Show loading state

    // Prepare registration data
    const registrationData = { name, email, password };
    
    // Add admin secret if provided (for admin registration)
    if (adminSecret.trim()) {
      registrationData.adminSecret = adminSecret;
    }

    // Try to register with name, email, password, and optional admin secret
    const result = await register(registrationData);
    
    // Check if registration was successful
    if (result.success) {
      await loadCart();       // Reload user's cart
      onClose();              // Close the modal
      setName('');            // Clear name field
      setEmail('');           // Clear email field
      setPassword('');        // Clear password field
      setConfirmPassword(''); // Clear confirm password field
      setAdminSecret('');     // Clear admin secret field
    } else {
      // Show error message if registration failed
      setError(result.error || 'Registration failed');
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
              <h2 className="text-3xl font-bold text-white mb-1">Create Account</h2>
              <p className="text-blue-100 text-sm">Join us today</p>
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
          
          {/* Show error message if registration fails */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Input Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                {/* User icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <FaUser className="text-gray-400" />
                </div>
                {/* Name input box */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update name when user types
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password when user types
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                {/* Lock icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <FaLock className="text-gray-400" />
                </div>
                {/* Confirm password input box */}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password when user types
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Admin Secret Input Field (Optional - only for admin registration) */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Admin Secret <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                {/* Lock icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <FaLock className="text-gray-400" />
                </div>
                {/* Admin secret input box */}
                <input
                  type="password"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)} // Update admin secret when user types
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Enter admin secret (leave empty for regular user)"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Only fill this if you're registering as an admin</p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="w-full bg-blue-500 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-300"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider line */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Switch to Login Button */}
          <button
            onClick={onSwitchToLogin}
            className="w-full border-2 border-blue-500 text-blue-500 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            Login to Existing Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Export component so it can be used in other files
export default RegisterModal;
