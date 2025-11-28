import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../../utils/api'

const YouMayLike = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const data = await fetchProducts()
      // Get 5 products for "you may like" section
      setProducts(data.slice(6, 11))
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-bold mb-4">You may like</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-bold mb-4">You may like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product, index) => (
          <div key={product.id || product._id || index} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="bg-gray-100 h-32 sm:h-40 flex items-center justify-center p-2">
              <img src={product.image || product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{product.name}</p>
              <p className="text-sm sm:text-base font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YouMayLike
