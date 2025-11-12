// Import React library to create components
import React from 'react'
// Import Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom'
// Import product images
import watch from '../assets/watch.png'
import laptops from '../assets/laptop.png'
import camera from '../assets/camera.png'
import airdbuds from '../assets/airbuds.png'
import mobiles from '../assets/mobile.png'

// Component that displays deals and offers section
const DealsSection = () => {
  // Array of products with their images
  const products = [
    { image: watch },
    { image: laptops },
    { image: camera },
    { image: airdbuds },
    { image: mobiles }
  ]

  return (
    // Main container with padding
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      {/* White card container */}
      <div className="bg-white rounded-lg p-4 sm:p-6">
        
        {/* Header with title and countdown timer */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          {/* Section title */}
          <h2 className="text-lg sm:text-xl font-bold">Deals and offers</h2>
          
          {/* Countdown timer showing hours:minutes:seconds */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Hours */}
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">13</div>
            <span className="text-xs sm:text-base">:</span>
            {/* Minutes */}
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">34</div>
            <span className="text-xs sm:text-base">:</span>
            {/* Seconds */}
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">52</div>
            <span className="text-xs sm:text-base">:</span>
            {/* Milliseconds */}
            <div className="bg-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold">02</div>
          </div>
        </div>

        {/* Grid layout for products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Loop through each product and display it */}
          {products.map((product, index) => (
            // Link to product detail page
            <Link
              key={index}
              to={`/product/${index + 1}`}
              className="rounded-lg p-3 sm:p-4 hover:shadow-lg transition cursor-pointer block"
            >
              {/* Product image */}
              <img 
                src={product.image} 
                alt={`Deal product ${index + 1}`} 
                className="max-w-full max-h-full" 
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Export component so it can be used in other files
export default DealsSection
