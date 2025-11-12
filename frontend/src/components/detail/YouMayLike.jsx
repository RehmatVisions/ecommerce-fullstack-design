import React from 'react'
import item1 from '../../assets/Item (2).png'
import item2 from '../../assets/Item (4).png'
import item3 from '../../assets/Item (8).png'
import item4 from '../../assets/1.png'
import item5 from '../../assets/2.png'

const YouMayLike = () => {
  const products = [
    { name: 'Blazers Suits Elegant Formal', price: '$7.00 - $99.50', image: item1 },
    { name: 'Man Shirt Sleeve Polo Contrast', price: '$7.00 - $99.50', image: item2 },
    { name: 'Apple Watch Series Space Gray', price: '$7.00 - $99.50', image: item3 },
    { name: 'Basketball Crew Socks Long Stuff', price: '$7.00 - $99.50', image: item4 },
    { name: 'New Summer Men\'s Casual T-Shirts', price: '$7.00 - $99.50', image: item5 }
  ]

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-bold mb-4">You may like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="bg-gray-100 h-32 sm:h-40 flex items-center justify-center p-2">
              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
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
