import React from 'react'
import { FaMobileAlt, FaClock, FaLaptop, FaShoppingCart } from 'react-icons/fa'

const SavedForLater = () => {
  const savedItems = [
    {
      id: 1,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      icon: FaMobileAlt
    },
    {
      id: 2,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      icon: FaMobileAlt
    },
    {
      id: 3,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      icon: FaClock
    },
    {
      id: 4,
      name: 'GoPro HERO6 4K Action Camera - Black',
      price: 99.50,
      icon: FaLaptop
    }
  ]

  return (
    <div className="mt-8 sm:mt-12">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Saved for later</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {savedItems.map((item) => {
          const IconComponent = item.icon
          return (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gray-100 h-32 sm:h-48 flex items-center justify-center">
                <IconComponent className="text-4xl sm:text-6xl text-gray-600" />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-base sm:text-lg font-bold mb-2">${item.price.toFixed(2)}</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{item.name}</p>
                <button className="w-full flex items-center justify-center gap-2 text-blue-500 border border-blue-500 rounded py-2 text-xs sm:text-sm hover:bg-blue-50">
                  <FaShoppingCart /> Move to cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SavedForLater
