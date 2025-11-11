import React from 'react'

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div 
      onClick={onViewDetails}
      className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 hover:shadow-lg transition cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full sm:w-32 md:w-40 lg:w-48 h-32 sm:h-32 md:h-40 lg:h-48 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
        <span className="text-4xl sm:text-5xl lg:text-6xl">{product.image}</span>
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-medium mb-2">{product.name}</h3>
        
        {/* Price and Rating */}
        <div className="flex items-center gap-2 sm:gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Rating and Orders */}
        <div className="flex items-center gap-2 sm:gap-4 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm sm:text-base ${i < product.rating ? 'text-orange-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-orange-400">{product.rating}.0</span>
          <span className="text-xs sm:text-sm text-gray-400">• {product.orders} orders</span>
          {product.freeShipping && (
            <span className="text-xs sm:text-sm text-green-600">• Free Shipping</span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 hidden sm:block">
          {product.description}
        </p>

        {/* View Details Link */}
        <span className="text-blue-500 text-xs sm:text-sm hover:underline">
          View details
        </span>
      </div>

      {/* Wishlist Button */}
      <div className="flex-shrink-0 absolute top-3 right-3 sm:relative sm:top-0 sm:right-0">
        <button 
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 bg-white"
        >
          <span className="text-gray-400">♡</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
