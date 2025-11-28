import React from 'react'
import { FaFlag, FaCheckCircle, FaGlobe, FaHeart } from 'react-icons/fa'

const SupplierCard = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Supplier Info */}
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-200 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg sm:text-xl">R</span>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold">Supplier</h3>
            <p className="text-xs sm:text-sm text-gray-600">Guanjoi Trading LLC</p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <FaFlag className="text-gray-400" />
            <span className="text-gray-600">Germany, Berlin</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-gray-400" />
            <span className="text-gray-600">Verified Seller</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGlobe className="text-gray-400" />
            <span className="text-gray-600">Worldwide shipping</span>
          </div>
        </div>

        <button 
          onClick={() => alert('Inquiry sent! The supplier will contact you soon.')}
          className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 mb-3 text-sm sm:text-base"
        >
          Send inquiry
        </button>
        <button 
          onClick={() => alert('Seller profile feature coming soon!')}
          className="w-full text-blue-500 py-2 sm:py-3 rounded-lg font-medium border border-blue-500 hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base"
        >
          Seller's profile
        </button>
      </div>

      {/* Save for Later */}
      <button 
        onClick={() => alert('Product saved to wishlist!')}
        className="w-full bg-white text-gray-700 py-2 sm:py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <FaHeart className="text-blue-500" /> Save for later
      </button>
    </div>
  )
}

export default SupplierCard
