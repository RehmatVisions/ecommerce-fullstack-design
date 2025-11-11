import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ onViewDetails }) => {
  const products = [
    {
      id: 1,
      name: 'Canon Camera EOS 2000, Black 10x zoom',
      price: 998.00,
      originalPrice: 1128.00,
      rating: 4,
      orders: 154,
      image: '📱',
      freeShipping: true,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
    {
      id: 2,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 998.00,
      rating: 4,
      orders: 154,
      image: '📱',
      freeShipping: true,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
    {
      id: 3,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 998.00,
      rating: 4,
      orders: 154,
      image: '📱',
      freeShipping: true,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
    {
      id: 4,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 998.00,
      rating: 4,
      orders: 154,
      image: '💻',
      freeShipping: true,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
    {
      id: 5,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 998.00,
      originalPrice: 1128.00,
      rating: 4,
      orders: 154,
      image: '⌚',
      freeShipping: true,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    },
    {
      id: 6,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 998.00,
      rating: 4,
      orders: 154,
      image: '🎧',
      freeShipping: true,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit'
    }
  ]

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <h2 className="text-sm sm:text-base lg:text-lg">
            <span className="font-bold">12,911</span> items in <span className="font-bold">Mobile accessory</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Verified only</span>
          </label>
          <select className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm">
            <option>Featured</option>
          </select>
          <div className="flex gap-2">
            <button className="p-1 sm:p-2 border border-gray-300 rounded hover:bg-gray-50">
              <span className="text-base sm:text-lg">⊞</span>
            </button>
            <button className="p-1 sm:p-2 border border-gray-300 rounded hover:bg-gray-50">
              <span className="text-base sm:text-lg">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-3 sm:space-y-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg p-3 sm:p-4 mt-3 sm:mt-4 flex items-center justify-center gap-2 flex-wrap">
        <span className="text-xs sm:text-sm text-gray-600">Show 10</span>
        <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
          <span>‹</span>
        </button>
        <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">1</button>
        <button className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded text-sm">2</button>
        <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
        <button className="px-2 sm:px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
          <span>›</span>
        </button>
      </div>
    </div>
  )
}

export default ProductGrid
