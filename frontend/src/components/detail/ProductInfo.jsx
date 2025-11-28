import React from 'react'
import { FaCheckCircle, FaStar } from 'react-icons/fa'

const ProductInfo = ({ product }) => {
  if (!product) return null;
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      {/* Stock Status */}
      <div className="flex items-center gap-2 mb-3">
        <FaCheckCircle className="text-green-600 text-xs sm:text-sm" />
        <span className="text-green-600 text-xs sm:text-sm">In stock</span>
      </div>

      {/* Product Title */}
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">
        {product.name}
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
        {product.oldPrice && (
          <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
            <span className="text-red-500 text-xs sm:text-sm line-through">${product.oldPrice}</span>
          </div>
        )}
        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-red-500">${product.price}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6">
        {product.description && (
          <div className="flex flex-col sm:flex-row">
            <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Description:</span>
            <span className="font-medium">{product.description}</span>
          </div>
        )}
        {product.category && (
          <div className="flex flex-col sm:flex-row">
            <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Category:</span>
            <span className="font-medium">{product.category}</span>
          </div>
        )}
        {product.brand && (
          <div className="flex flex-col sm:flex-row">
            <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Brand:</span>
            <span className="font-medium">{product.brand}</span>
          </div>
        )}
        {product.stock !== undefined && (
          <div className="flex flex-col sm:flex-row">
            <span className="text-gray-500 sm:w-32 font-medium sm:font-normal">Stock:</span>
            <span className="font-medium">{product.stock} units</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
