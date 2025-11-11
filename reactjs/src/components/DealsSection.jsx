import React from 'react'
import watch from '../assets/watch.png'
import laptops from '../assets/laptop.png'
import camera from '../assets/camera.png'
import airdbuds from '../assets/airbuds.png'
import mobiles from '../assets/mobile.png'
const DealsSection = ({ onProductClick }) => {
  const products = [
    { image: watch },
    { image: laptops },
    { image: camera },
    { image: airdbuds },
    { image: mobiles }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6 " >
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
              className=" rounded-lg p-3 sm:p-4 hover:shadow-lg transition cursor-pointer"
            >
                <img src={product.image} alt="" className="max-w-full max-h-full" />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DealsSection
