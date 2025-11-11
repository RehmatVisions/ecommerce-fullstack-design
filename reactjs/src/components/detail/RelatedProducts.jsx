import React from 'react'

const RelatedProducts = () => {
  const products = [
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '👖' },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '⌚' },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '🎧' },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '🩳' },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '☕' },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: '👜' }
  ]

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Related products</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="bg-gray-100 h-24 sm:h-32 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">{product.image}</span>
            </div>
            <div className="p-2 sm:p-3">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{product.name}</p>
              <p className="text-xs sm:text-sm font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
