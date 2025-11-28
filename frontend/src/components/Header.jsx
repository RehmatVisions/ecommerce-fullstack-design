import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-symbol.png'
import { FaUser, FaShoppingCart, FaHeart, FaCommentDots, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import LoginModal from './auth/LoginModal'
import RegisterModal from './auth/RegisterModal'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-500 text-xl"
          >
            <FaBars />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm"><img src={logo} alt="" /></span>
            </div>
            <span className="text-blue-500 font-bold text-base sm:text-xl">Brand</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-8">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const searchInput = e.target.querySelector('input[name="search"]');
                if (searchInput && searchInput.value.trim()) {
                  window.location.href = `/products?search=${encodeURIComponent(searchInput.value.trim())}`;
                } else {
                  window.location.href = '/products';
                }
              }}
              className="flex"
            >
              <input
                type="text"
                name="search"
                placeholder="Search products..."
                className="flex-1 px-2 sm:px-4 py-2 border border-blue-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.target.form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }
                }}
              />
              <select className="hidden sm:block px-3 py-2 border-t border-b border-blue-500 bg-white text-sm focus:outline-none">
                <option>All category</option>
              </select>
              <button 
                type="submit"
                className="px-3 sm:px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all duration-300 ease-out text-sm transform"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-sm text-gray-700">Hi, {user?.name}</span>
                <button 
                  onClick={handleLogout}
                  className="flex flex-col items-center text-gray-600 hover:text-red-500 hover:scale-110 transition-all duration-300 ease-out transform"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-base sm:text-xl" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex flex-col items-center text-gray-600 hover:text-blue-500"
              >
                <FaUser className="text-base sm:text-xl" />
              </button>
            )}
            <button 
              onClick={() => alert('Messages feature coming soon!')}
              className="hidden sm:flex flex-col items-center text-gray-600 hover:text-blue-500 transition-all duration-300"
            >
              <FaCommentDots className="text-xl" />
            </button>
            <button 
              onClick={() => alert('Wishlist feature coming soon!')}
              className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-500 transition-all duration-300"
            >
              <FaHeart className="text-xl" />
            </button>
            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-500 relative">
              <FaShoppingCart className="text-base sm:text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop Only */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
            <Link to="/products" className="flex items-center gap-1 hover:text-blue-500 whitespace-nowrap">
              <FiMenu /> All category
            </Link>
            <a href="#deals" onClick={(e) => { e.preventDefault(); document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 whitespace-nowrap cursor-pointer">Hot offers</a>
            <a href="#gadgets" onClick={(e) => { e.preventDefault(); document.getElementById('gadgets')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 whitespace-nowrap cursor-pointer">Gift boxes</a>
            <a href="#recommended" onClick={(e) => { e.preventDefault(); document.getElementById('recommended')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 whitespace-nowrap cursor-pointer">Projects</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 whitespace-nowrap cursor-pointer">Menu item</a>
            <a href="#newsletter" onClick={(e) => { e.preventDefault(); document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 whitespace-nowrap cursor-pointer">Help</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm">
            <select className="bg-transparent text-xs sm:text-sm">
              <option>English, USD</option>
            </select>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">Ship to 🇺🇸</a>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">⬜</span>
              </div>
              <span className="text-blue-500 font-bold text-base">Brand</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-800 text-2xl leading-none"
            >
              <FaTimes />
            </button>
          </div>

          {/* User Actions */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Account</h3>
            <div className="space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="w-full flex items-center gap-3 text-gray-700 py-2">
                    <FaUser className="text-xl" />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-red-600 hover:text-red-700 py-2"
                  >
                    <FaSignOutAlt className="text-xl" />
                    <span className="text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setShowLoginModal(true)
                    }}
                    className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2"
                  >
                    <FaUser className="text-xl" />
                    <span className="text-sm">Login</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setShowRegisterModal(true)
                    }}
                    className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2"
                  >
                    <FaUser className="text-xl" />
                    <span className="text-sm">Register</span>
                  </button>
                </>
              )}
              <button 
                onClick={() => { setIsMobileMenuOpen(false); alert('Messages feature coming soon!'); }}
                className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2"
              >
                <FaCommentDots className="text-xl" />
                <span className="text-sm">Messages</span>
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); alert('Wishlist feature coming soon!'); }}
                className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2"
              >
                <FaHeart className="text-xl" />
                <span className="text-sm">Wishlist</span>
              </button>
              <Link to="/cart" className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2 relative">
                <FaShoppingCart className="text-xl" />
                <span className="text-sm">My Cart {cartCount > 0 && `(${cartCount})`}</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Menu</h3>
            <nav className="space-y-1">
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-left flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded">
                <FiMenu /> All category
              </Link>
              <a href="#deals" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded cursor-pointer">Hot offers</a>
              <a href="#gadgets" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('gadgets')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded cursor-pointer">Gift boxes</a>
              <a href="#recommended" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('recommended')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded cursor-pointer">Projects</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded cursor-pointer">Menu item</a>
              <a href="#newsletter" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded cursor-pointer">Help</a>
            </nav>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Language & Currency</label>
                <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm">
                  <option>English, USD</option>
                  <option>Spanish, EUR</option>
                  <option>French, EUR</option>
                </select>
              </div>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-500 py-2">
                <span>🇺🇸</span>
                <span className="text-sm">Ship to United States</span>
              </a>
            </div>
          </div>
        </div>
      </div>

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

export default Header
