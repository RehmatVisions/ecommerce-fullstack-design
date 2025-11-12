import { useState } from 'react'
import { Link } from 'react-router-dom'
import mobile1 from '../../assets/mobile.png'
import mobile2 from '../../assets/mobile.png'
import laptop from '../../assets/laptop.png'
import camera from '../../assets/camera.png'
import watch from '../../assets/watch.png'

const ProductGrid = () => {
  const [viewMode, setViewMode] = useState('list')

  const products = [
    { id: 1, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 1128.00, rating: 7.5, image: mobile1 },
    { id: 2, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 1128.00, rating: 7.5, image: mobile2 },
    { id: 3, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, rating: 7.5, image: mobile1 },
    { id: 4, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 1128.00, rating: 7.5, image: laptop },
    { id: 5, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 1128.00, rating: 7.5, image: camera },
    { id: 6, name: 'GoPro HERO6 4K Action Camera - Black', price: 89.50, rating: 7.5, image: mobile2 },
    { id: 7, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 1128.00, rating: 7.5, image: laptop },
    { id: 8, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, oldPrice: 1128.00, rating: 7.5, image: watch },
    { id: 9, name: 'GoPro HERO6 4K Action Camera - Black', price: 99.50, rating: 7.5, image: mobile1 }
  ]

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <h2 className="text-base">
          <span className="font-bold">12,911</span> items in <span className="font-bold">Mobile accessory</span>
        </h2>
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
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 flex items-center justify-center p-4 bg-white">
                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
              </div>
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
                  <span className="text-sm text-gray-500">{product.rating}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-lg transition">
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded">
                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {'★★★★☆'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
                  )}
                </div>
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
