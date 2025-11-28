import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaHeart, FaCommentDots, FaSignOutAlt } from 'react-icons/fa'
import logo from '../../assets/logo-symbol.png'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import LoginModal from '../auth/LoginModal'
import RegisterModal from '../auth/RegisterModal'

const CartHeader = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { getCartCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const cartCount = getCartCount()

  const handleSwitchToRegister = () => {
    setShowLoginModal(false)
    setShowRegisterModal(true)
  }

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false)
    setShowLoginModal(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">
                <img src={logo} alt="Brand Logo" />
              </span>
            </div>
            <span className="text-blue-500 font-bold text-base sm:text-xl">Brand</span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-sm text-gray-700">Hi, {user?.name}</span>
                <button 
                  onClick={logout}
                  className="flex flex-col items-center text-gray-600 hover:text-red-500 hover:scale-110 transition-all duration-300 ease-out transform"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-base sm:text-xl" />
                  <span className="text-xs hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <FaUser className="text-base sm:text-xl" />
                <span className="text-xs hidden sm:block">Profile</span>
              </button>
            )}
            <button 
              onClick={() => alert('Messages feature coming soon!')}
              className="hidden sm:flex flex-col items-center text-gray-600 hover:text-blue-500 transition-all duration-300"
            >
              <FaCommentDots className="text-xl" />
              <span className="text-xs">Message</span>
            </button>
            <button 
              onClick={() => alert('Wishlist feature coming soon!')}
              className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-500 transition-all duration-300"
            >
              <FaHeart className="text-xl" />
              <span className="text-xs">Orders</span>
            </button>
            <Link to="/cart" className="flex flex-col items-center text-blue-500 relative">
              <FaShoppingCart className="text-base sm:text-xl" />
              <span className="text-xs hidden sm:block">My cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />

      {/* Register Modal */}
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  )
}

export default CartHeader
