import React from 'react'

const YouMayLike = () => {
  const products = [
    { name: 'Blazers Suits Elegant Formal', price: '$7.00 - $99.50', image: '👔' },
    { name: 'Man Shirt Sleeve Polo Contrast', price: '$7.00 - $99.50', image: '👕' },
    { name: 'Apple Watch Series Space Gray', price: '$7.00 - $99.50', image: '🧥' },
    { name: 'Basketball Crew Socks Long Stuff', price: '$7.00 - $99.50', image: '👕' },
    { name: 'New Summer Men\'s Casual T-Shirts', price: '$7.00 - $99.50', image: '👕' }
  ]

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-bold mb-4">You may like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="bg-gray-100 h-32 sm:h-40 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl">{product.image}</span>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{product.name}</p>
              <p className="text-sm sm:text-base font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YouMayLike
