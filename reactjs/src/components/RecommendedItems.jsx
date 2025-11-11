import React from 'react'

const RecommendedItems = ({ onProductClick }) => {
  const products = [
    { name: 'T-shirts with multiple colors', price: '$10.30', image: '👕' },
    { name: 'Jeans shorts for men blue', price: '$10.30', image: '🧥' },
    { name: 'Brown winter coat medium', price: '$12.50', image: '🧥' },
    { name: 'Jeans bag for travel for men', price: '$34.00', image: '👖' },
    { name: 'Leather wallet', price: '$99.00', image: '🎒' },
    { name: 'Canon camera black, 100x zoom', price: '$9.99', image: '🩳' },
    { name: 'Headset for gaming with mic', price: '$8.99', image: '🎧' },
    { name: 'Jeans bag for travel for men', price: '$24.00', image: '🎒' },
    { name: 'Ceramic pot for office', price: '$10.30', image: '🏺' },
    { name: 'Smart watch silver color', price: '$10.30', image: '☕' }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Recommended items</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <div 
            key={index} 
            onClick={onProductClick}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div className="bg-gray-100 h-32 sm:h-40 flex items-center justify-center text-4xl sm:text-5xl">
              {product.image}
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-base sm:text-lg font-bold mb-1">{product.price}</p>
              <p className="text-xs sm:text-sm text-gray-600">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendedItems
