// Import React library to create components
import React, { useState, useEffect } from 'react'
// Import Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom'
import { fetchProducts } from '../utils/api'
import { useCart } from '../context/CartContext'

// Component that displays deals and offers section
const DealsSection = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const scrollRef = React.useRef(null)

  const handleAddToCart = async (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    await addToCart(productId, 1)
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const data = await fetchProducts()
      // Get first 5 products for deals section
      setProducts(data.slice(0, 5))
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="bg-white rounded-lg p-4 sm:p-6">
          <p className="text-gray-500">Loading deals...</p>
        </div>
      </div>
    )
  }

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

        {/* Scrollable container with navigation buttons */}
        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full w-10 h-10 items-center justify-center hover:bg-blue-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 ease-out -ml-5 border border-gray-200 transform"
          >
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full w-10 h-10 items-center justify-center hover:bg-blue-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 ease-out -mr-5 border border-gray-200 transform"
          >
            <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Scrollable grid layout for products */}
          <div 
            ref={scrollRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:flex md:overflow-x-auto md:scroll-smooth scrollbar-hide"
          >
            {/* Loop through each product and display it */}
            {products.map((product, index) => (
              <div
                key={product.id || product._id || index}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col md:min-w-[200px] md:flex-shrink-0 group"
              >
              {/* Product image */}
              <Link to={`/product/${product._id || product.id}`} className="flex-1">
                <div className="h-32 sm:h-40 flex items-center justify-center mb-2 overflow-hidden">
                  <img 
                    src={product.image || product.imageUrl} 
                    alt={product.name || `Deal product ${index + 1}`} 
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" 
                  />
                </div>
              </Link>
              
              {/* Product info */}
              <div className="mt-auto">
                <Link to={`/product/${product._id || product.id}`}>
                  <p className="text-xs sm:text-sm font-medium mb-1 line-clamp-2">{product.name}</p>
                  <p className="text-sm sm:text-base font-bold text-red-600 mb-2">${product.price}</p>
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
      </div>
    </div>
  )
}

// Export component so it can be used in other files
export default DealsSection
