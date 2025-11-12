import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-symbol.png'
import { FaUser, FaShoppingCart, FaHeart, FaCommentDots, FaBars, FaTimes } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200">
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
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 px-2 sm:px-4 py-2 border border-blue-500 rounded-l-md focus:outline-none text-sm"
              />
              <select className="hidden sm:block px-3 py-2 border-t border-b border-blue-500 bg-white text-sm">
                <option>All category</option>
              </select>
              <button className="px-3 sm:px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 text-sm">
                Search
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
              <FaUser className="text-base sm:text-xl" />
            </button>
            <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-blue-500">
              <FaCommentDots className="text-xl" />
            </button>
            <button className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-500">
              <FaHeart className="text-xl" />
            </button>
            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
              <FaShoppingCart className="text-base sm:text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop Only */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3 flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
            <button className="flex items-center gap-1 hover:text-blue-500 whitespace-nowrap">
              <FiMenu /> All category
            </button>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">Hot offers</a>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">Gift boxes</a>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">Projects</a>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">Menu item</a>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">Help</a>
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
              <button className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2">
                <FaUser className="text-xl" />
                <span className="text-sm">Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2">
                <FaCommentDots className="text-xl" />
                <span className="text-sm">Messages</span>
              </button>
              <button className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2">
                <FaHeart className="text-xl" />
                <span className="text-sm">Wishlist</span>
              </button>
              <Link to="/cart" className="w-full flex items-center gap-3 text-gray-700 hover:text-blue-500 py-2">
                <FaShoppingCart className="text-xl" />
                <span className="text-sm">My Cart</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Menu</h3>
            <nav className="space-y-1">
              <button className="w-full text-left flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded">
                <FiMenu /> All category
              </button>
              <a href="#" className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded">Hot offers</a>
              <a href="#" className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded">Gift boxes</a>
              <a href="#" className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded">Projects</a>
              <a href="#" className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded">Menu item</a>
              <a href="#" className="block text-gray-700 hover:text-blue-500 hover:bg-gray-50 py-2 px-2 rounded">Help</a>
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
    </>
  )
}

export default Header
