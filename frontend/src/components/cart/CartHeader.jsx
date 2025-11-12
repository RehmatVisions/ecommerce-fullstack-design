import React from 'react'
import { FaUser, FaShoppingCart, FaHeart, FaCommentDots } from 'react-icons/fa'

const CartHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">⬜</span>
          </div>
          <span className="text-blue-500 font-bold text-base sm:text-xl">Brand</span>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaUser className="text-base sm:text-xl" />
            <span className="text-xs hidden sm:block">Profile</span>
          </button>
          <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaCommentDots className="text-xl" />
            <span className="text-xs">Message</span>
          </button>
          <button className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaHeart className="text-xl" />
            <span className="text-xs">Orders</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaShoppingCart className="text-base sm:text-xl" />
            <span className="text-xs hidden sm:block">My cart</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default CartHeader
