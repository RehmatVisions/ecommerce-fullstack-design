import React from 'react'
import { FaCheckCircle, FaStar } from 'react-icons/fa'

const ProductInfo = () => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      {/* Stock Status */}
      <div className="flex items-center gap-2 mb-3">
        <FaCheckCircle className="text-green-600 text-xs sm:text-sm" />
        <span className="text-green-600 text-xs sm:text-sm">In stock</span>
      </div>

      {/* Product Title */}
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">
        Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
      </h1>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-2 sm:gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-sm sm:text-base ${i < 4 ? 'text-orange-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs sm:text-sm text-orange-400">4.0</span>
        <span className="text-xs sm:text-sm text-gray-400">• 32 reviews</span>
        <span className="text-xs sm:text-sm text-gray-400">• 154 sold</span>
      </div>

      {/* Pricing */}
      <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
        <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
          <span className="text-red-500 text-xs sm:text-sm line-through">$1128 pcs</span>
        </div>
        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-red-500">$83.00</span>
          <span className="text-xs sm:text-sm text-gray-500">/50-100 pcs</span>
        </div>
        <div className="flex items-baseline gap-2 sm:gap-3 mt-1">
          <span className="text-lg sm:text-xl font-bold">$78.00</span>
          <span className="text-xs sm:text-sm text-gray-500">/100+ pcs</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6">
        <div className="flex flex-col sm:flex-row">
          <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Price:</span>
          <span className="font-medium">Negotiable</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Type:</span>
          <span className="font-medium">Classic shoes</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Material:</span>
          <span className="font-medium">Plastic material</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Design:</span>
          <span className="font-medium">Modern nice</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Customization:</span>
          <span className="font-medium">Customized logo and design custom packages</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Protection:</span>
          <span className="font-medium">Refund Policy</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Warranty:</span>
          <span className="font-medium">2 years full warranty</span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
