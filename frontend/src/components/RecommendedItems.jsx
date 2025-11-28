// Import Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchProducts } from '../utils/api'
import { useCart } from '../context/CartContext'

// Component that displays recommended products
const RecommendedItems = () => {
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
      // Get first 10 products for recommended section
      setProducts(data.slice(0, 10))
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="px-3 sm:px-6 pb-3 sm:pb-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Recommended items</h2>
        <p className="text-gray-500">Loading products...</p>
      </div>
    )
  }

  return (
    // Main container with padding
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      {/* Section title */}
      <h2 className="text-lg sm:text-xl font-bold mb-4">Recommended items</h2>
      
      {/* Grid layout for products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Loop through each product and display it */}
        {products.map((product, index) => (
          <div
            key={product._id || product.id || index}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col group"
          >
            {/* Product image container */}
            <Link to={`/product/${product._id || product.id}`} className="flex-shrink-0 overflow-hidden">
              <div className="h-32 sm:h-40">
                <img 
                  src={product.image || product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out" 
                />
              </div>
            </Link>
            
            {/* Product information */}
            <div className="p-3 sm:p-4 bg-gray-50 flex-1 flex flex-col">
              <Link to={`/product/${product._id || product.id}`} className="flex-1">
                {/* Product price */}
                <p className="text-base sm:text-lg font-bold mb-1">${product.price}</p>
                {/* Product name */}
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{product.name}</p>
              </Link>
              
              {/* Add to cart button */}
              <button
                onClick={(e) => handleAddToCart(e, product._id || product.id)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all duration-300 ease-out shadow-sm transform mt-auto"
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
export default RecommendedItems
