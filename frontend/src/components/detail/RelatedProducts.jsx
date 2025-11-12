import React from 'react'
import item1 from '../../assets/3.png'
import item2 from '../../assets/watch (2).png'
import item3 from '../../assets/airbuds.png'
import item4 from '../../assets/4.png'
import item5 from '../../assets/Item (23).png'
import item6 from '../../assets/Item (11).png'

const RelatedProducts = () => {
  const products = [
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: item1 },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: item2 },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: item3 },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: item4 },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: item5 },
    { name: 'Xiaomi Redmi 8 Original', price: '$32.00-$40.00', image: item6 }
  ]

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Related products</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="bg-gray-100 h-24 sm:h-32 flex items-center justify-center p-2">
              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
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
