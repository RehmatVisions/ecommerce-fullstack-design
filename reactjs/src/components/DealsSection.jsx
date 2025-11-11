import React from 'react'

const DealsSection = ({ onProductClick }) => {
  const products = [
    { name: 'Smart watches', discount: '-25%' },
    { name: 'Laptops', discount: '-15%' },
    { name: 'GoPro cameras', discount: '-40%' },
    { name: 'Headphones', discount: '-25%' },
    { name: 'Canon cameras', discount: '-25%' }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6 mr-50">
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg sm:text-xl font-bold">Deals and offers</h2>
          {/* Timer */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">13</div>
            <span className="text-xs sm:text-base">:</span>
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">34</div>
            <span className="text-xs sm:text-base">:</span>
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">52</div>
            <span className="text-xs sm:text-base">:</span>
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">02</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <div 
              key={index} 
              onClick={onProductClick}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition cursor-pointer"
            >
              <div className="bg-gray-100 h-24 sm:h-32 rounded mb-3 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded"></div>
              </div>
              <h3 className="text-xs sm:text-sm font-medium mb-1">{product.name}</h3>
              <p className="text-red-500 font-semibold text-xs sm:text-sm">{product.discount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DealsSection
