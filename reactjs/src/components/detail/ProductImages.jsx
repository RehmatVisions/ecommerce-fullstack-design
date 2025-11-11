import React, { useState } from 'react'

const ProductImages = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  
  const images = ['👕', '👕', '👕', '👕', '👕', '👕']

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      {/* Main Image */}
      <div className="bg-gray-100 rounded-lg h-64 sm:h-80 lg:h-96 flex items-center justify-center mb-4">
        <span className="text-6xl sm:text-8xl lg:text-9xl">{images[selectedImage]}</span>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-6 gap-1 sm:gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`bg-gray-100 rounded-lg h-12 sm:h-16 flex items-center justify-center hover:border-2 hover:border-blue-500 ${
              selectedImage === index ? 'border-2 border-blue-500' : ''
            }`}
          >
            <span className="text-lg sm:text-2xl">{image}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImages
