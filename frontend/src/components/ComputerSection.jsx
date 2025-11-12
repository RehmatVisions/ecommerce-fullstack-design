// Import React library to create components
import React from 'react'
// Import Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom'
// Import background image for the banner
import consumerImg from '../assets/consumer.png'
// Import product images
import first from '../assets/eleven.png'
import second from '../assets/twelve.png'
import third from '../assets/thirteen.png'
import four from '../assets/fourteen.png'
import five from '../assets/fiveteen.png'
import six from '../assets/sixteen.png'
import seven from '../assets/seventeen.png'
import eight from '../assets/nine.png'

// Component that shows consumer electronics section
const ComputerSection = () => {
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
          style={{ backgroundImage: `url(${consumerImg})` }}
          className="rounded-lg p-4 sm:p-6 relative overflow-hidden min-h-[150px] sm:min-h-[200px]"
        >
          {/* Banner title */}
          <h2 className="text-base sm:text-xl font-bold mb-2">
            Consumer<br />electronics and<br />gadgets
          </h2>
          {/* Call to action button */}
          <button className="bg-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-100">
            Source now
          </button>
          {/* Decorative circle in bottom right */}
          <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-300 opacity-30 rounded-full"></div>
        </div>

        {/* Loop through products and display each one */}
        {products.map((product, index) => (
          // Link to product detail page
          <Link
            key={index}
            to={`/product/${index + 14}`}
            className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition cursor-pointer block"
          >
            {/* Product image container */}
            <div className="bg-gray-100 h-20 sm:h-24 rounded mb-3 flex items-center justify-center">
              <img src={product.img} alt={`Product ${index + 1}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Export component so it can be used in other files
export default ComputerSection