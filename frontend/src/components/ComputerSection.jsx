// Import React library to create components
import React, { useState, useEffect } from 'react'
// Import Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom'
// Import background image for the banner
import consumerImg from '../assets/consumer.png'
import { fetchProducts } from '../utils/api'
import { useCart } from '../context/CartContext'

// Component that shows consumer electronics section
const ComputerSection = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  const handleAddToCart = async (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    await addToCart(productId, 1)
  }

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const data = await fetchProducts()
      // Show up to 8 products for electronics section
      // If less than 8 products available, show what we have
      setProducts(data.slice(0, 8))
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="px-3 sm:px-6 pb-3 sm:pb-6">
        <p className="text-gray-500">Loading electronics...</p>
      </div>
    )
  }

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
          {/* Call to action button - navigates to products page */}
          <button 
            onClick={() => window.location.href = '/products'}
            className="bg-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-gray-100 hover:shadow-md transition-all duration-300"
          >
            Source now
          </button>
          {/* Decorative circle in bottom right */}
          <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-300 opacity-30 rounded-full"></div>
        </div>

        {/* Loop through products and display each one */}
        {products.map((product, index) => (
          <div
            key={product.id || product._id || index}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col group"
          >
            {/* Product image container */}
            <Link to={`/product/${product._id || product.id}`} className="flex-1">
              <div className="bg-gray-100 h-20 sm:h-24 rounded mb-2 flex items-center justify-center p-2 overflow-hidden">
                <img 
                  src={product.image || product.imageUrl} 
                  alt={product.name || `Product ${index + 1}`}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
            </Link>
            
            {/* Product info */}
            <div className="mt-auto">
              <Link to={`/product/${product._id || product.id}`}>
                <p className="text-xs sm:text-sm font-medium mb-1 line-clamp-2">{product.name}</p>
                <p className="text-sm sm:text-base font-bold text-blue-600 mb-2">${product.price}</p>
              </Link>
              
              {/* Add to cart button */}
              <button
                onClick={(e) => handleAddToCart(e, product._id || product.id)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all duration-300 ease-out shadow-sm transform"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Export component so it can be used in other files
export default ComputerSection