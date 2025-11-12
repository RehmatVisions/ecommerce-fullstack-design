// Import React library to create components
import React from 'react'
// Import Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom'
// Import background image for the banner
import OutdoorImg from '../assets/outdoor.png'
// Import product images
import first from '../assets/one.png'
import second from '../assets/two.png'
import third from '../assets/three.png'
import four from '../assets/four.png'
import five from '../assets/five.png'
import six from '../assets/six.png'
import seven from '../assets/seven.png'
import eight from '../assets/eight.png'

// Component that displays home and outdoor gadgets section
const HomeGadgets = () => {
  // Array of products with their images
  const products = [
    { img: first },
    { img: second },
    { img: third },
    { img: four },
    { img: five },
    { img: six },
    { img: seven },
    { img: eight }
  ]

  return (
    // Main container with padding
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      {/* Grid layout for banner and products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

        {/* Left Banner with background image */}
        <div
          style={{ backgroundImage: `url(${OutdoorImg})` }}
          className="relative rounded-lg p-4 sm:p-6 min-h-[150px] sm:min-h-[200px] bg-cover bg-center flex flex-col justify-between text-white overflow-hidden"
        >
          {/* Banner title */}
          <h2 className="text-base sm:text-xl font-bold leading-snug">
            Home & <br /> Outdoor
          </h2>
          {/* Call to action button */}
          <button className="bg-white text-black px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-100 transition">
            Source Now
          </button>
          {/* Decorative circle in bottom right */}
          <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"></div>
        </div>

        {/* Loop through products and display each one */}
        {products.map((product, index) => (
          // Link to product detail page
          <Link
            key={index}
            to={`/product/${index + 6}`}
            className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-lg transition cursor-pointer flex flex-col items-center"
          >
            {/* Product image container */}
            <div className="w-full h-30 sm:h-48 flex items-center justify-center mb-3">
              <img
                src={product.img}
                alt={`Home gadget ${index + 1}`}
                className="max-h-full object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Export component so it can be used in other files
export default HomeGadgets
