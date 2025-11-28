import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../../utils/api'
import { useCart } from '../../context/CartContext'

const ProductGrid = () => {
  const [viewMode, setViewMode] = useState('list')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const { addToCart, addingToCart } = useCart()

  const handleAddToCart = async (e, productId) => {
    e.preventDefault() // Prevent navigation to product detail
    e.stopPropagation()
    await addToCart(productId, 1)
  }

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const data = await fetchProducts()
      
      // Get search and category from URL
      const searchQuery = searchParams.get('search')
      const category = searchParams.get('category')
      
      let filtered = data
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(p => 
          p.name?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
        )
      }
      
      // Filter by category
      if (category) {
        filtered = filtered.filter(p => 
          p.category?.toLowerCase().includes(category.toLowerCase())
        )
      }
      
      setProducts(filtered)
      setLoading(false)
    }
    loadProducts()
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    )
  }

  // Show no results message
  if (products.length === 0) {
    return (
      <div className="flex-1">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">No products found</h2>
          {searchQuery && (
            <p className="text-gray-600 mb-4">
              No results for "<span className="font-semibold">{searchQuery}</span>"
            </p>
          )}
          <p className="text-gray-500 mb-6">
            Try adjusting your search or browse all products
          </p>
          <button
            onClick={() => window.location.href = '/products'}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    )
  }

  // Get search and category for display
  const searchQuery = searchParams.get('search')
  const category = searchParams.get('category')

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base">
            <span className="font-bold">{products.length}</span> {products.length === 1 ? 'item' : 'items'} found
            {searchQuery && (
              <span className="ml-2">
                for "<span className="font-bold text-blue-600">{searchQuery}</span>"
              </span>
            )}
            {category && !searchQuery && (
              <span className="ml-2">
                in <span className="font-bold text-blue-600">{category}</span>
              </span>
            )}
          </h2>
          {(searchQuery || category) && (
            <button
              onClick={() => window.location.href = '/products'}
              className="text-sm text-blue-500 hover:underline mt-1"
            >
              Clear filters
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm">Verified only</span>
          </label>
          <select className="px-3 py-2 border border-gray-300 rounded text-sm">
            <option>Featured</option>
          </select>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 border rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z"/>
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 border rounded ${viewMode === 'list' ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4h14v2H3V4zm0 5h14v2H3V9zm0 5h14v2H3v-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <Link to={`/product/${product._id || product.id}`}>
                <div className="h-48 flex items-center justify-center p-4 bg-white">
                  <img src={product.image || product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>
              </Link>
              <div className="p-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400">
                    {'★★★★☆'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.rating || '4.0'}</span>
                </div>
                <Link to={`/product/${product._id || product.id}`}>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-1">{product.name}</p>
                </Link>
                {product.category && (
                  <p className="text-xs text-blue-600 mb-2">{product.category}</p>
                )}
                <button
                  onClick={(e) => handleAddToCart(e, product._id || product.id)}
                  disabled={addingToCart}
                  className="w-full bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id || product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-lg transition">
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded">
                <img src={product.image || product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-2">{product.name}</h3>
                {product.category && (
                  <p className="text-xs text-blue-600 mb-1">Category: {product.category}</p>
                )}
                {product.description && (
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                )}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {'★★★★☆'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.rating || '4.0'}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
                  )}
                </div>
                {product.stock !== undefined && (
                  <p className="text-xs text-gray-500 mb-2">Stock: {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}</p>
                )}
                <button
                  onClick={(e) => handleAddToCart(e, product._id || product.id)}
                  disabled={addingToCart}
                  className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
              <button className="text-gray-400 hover:text-blue-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="bg-white rounded-lg p-4 mt-4 flex items-center justify-center gap-2">
        <span className="text-sm text-gray-600 mr-2">Show 10</span>
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">‹</button>
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">1</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded">2</button>
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">›</button>
      </div>
    </div>
  )
}

export default ProductGrid
