import React from 'react'

const HomeGadgets = ({ onProductClick }) => {
  const products = [
    { name: 'Soft chairs', price: '$19' },
    { name: 'Sofa & chair', price: '$19' },
    { name: 'Kitchen mixer', price: '$100' },
    { name: 'Blenders', price: '$39' },
    { name: 'Home appliance', price: '$19' },
    { name: 'Coffee maker', price: '$10' },
    { name: 'Tents', price: '$15' },
    { name: 'Office chair', price: '$19' }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Left Banner */}
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-4 sm:p-6 relative overflow-hidden min-h-[150px] sm:min-h-[200px]">
          <h2 className="text-base sm:text-xl font-bold mb-2">Home and<br />outdoor</h2>
          <button className="bg-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-100">
            Source now
          </button>
          <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-yellow-300 opacity-30 rounded-full"></div>
        </div>

        {/* Products Grid */}
        {products.map((product, index) => (
          <div 
            key={index} 
            onClick={onProductClick}
            className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition cursor-pointer"
          >
            <div className="bg-gray-100 h-20 sm:h-24 rounded mb-3 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded"></div>
            </div>
            <h3 className="text-xs sm:text-sm mb-1">{product.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeGadgets
