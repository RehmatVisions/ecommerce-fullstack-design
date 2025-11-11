import React from 'react'
import OutdoorImg from '../assets/outdoor.png'
import first from '../assets/one.png'
import second from '../assets/two.png'
import third from '../assets/three.png'
import four from '../assets/four.png'
import five from '../assets/five.png'
import six from '../assets/six.png'
import seven from '../assets/seven.png'
import eight from '../assets/eight.png'

const HomeGadgets = ({ onProductClick }) => {
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
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

        {/* Left Banner */}
        <div
          style={{ backgroundImage: `url(${OutdoorImg})` }}
          className="relative rounded-lg p-4 sm:p-6 min-h-[150px] sm:min-h-[200px] bg-cover bg-center flex flex-col justify-between text-white overflow-hidden"
        >
          <h2 className="text-base sm:text-xl font-bold leading-snug">
            Home & <br /> Outdoor
          </h2>
          <button className="bg-white text-black px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-100 transition">
            Source Now
          </button>
          {/* Optional decorative circle */}
          <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full"></div>
        </div>

        {/* Products Grid */}
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => onProductClick(product)}
            className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-lg transition cursor-pointer flex flex-col items-center"
          >
            <div className="w-full h-30 sm:h-48 flex items-center justify-center mb-3">
              <img
                src={product.img}
                alt={`product-${index}`}
                className="max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeGadgets
