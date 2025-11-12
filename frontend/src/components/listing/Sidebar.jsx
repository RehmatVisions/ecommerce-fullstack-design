import React from 'react'

const Sidebar = () => {
  const categories = [
    'Mobile accessory',
    'Electronics',
    'Smartphones',
    'Modern tech'
  ]

  const brands = [
    'Samsung',
    'Apple',
    'Huawei',
    'Pocco',
    'Lenovo'
  ]

  const features = [
    'Metallic',
    'Plastic cover',
    'USB port',
    'Super power',
    'Large Memory'
  ]

  const ratings = [
    { stars: 5, filled: 5 },
    { stars: 4, filled: 4 },
    { stars: 3, filled: 3 },
    { stars: 2, filled: 2 }
  ]

  return (
    <aside className="hidden lg:block w-48 xl:w-64 flex-shrink-0">
      {/* Category */}
      <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Category</h3>
          <button className="text-gray-400">^</button>
        </div>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <a href="#" className="text-sm text-gray-700 hover:text-blue-500">
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Brands</h3>
          <button className="text-gray-400">^</button>
        </div>
        <ul className="space-y-2">
          {brands.map((brand, index) => (
            <li key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label className="text-sm text-gray-700">{brand}</label>
            </li>
          ))}
        </ul>
        <button className="text-blue-500 text-sm mt-3">See all</button>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Features</h3>
          <button className="text-gray-400">^</button>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <label className="text-sm text-gray-700">{feature}</label>
            </li>
          ))}
        </ul>
        <button className="text-blue-500 text-sm mt-3">See all</button>
      </div>

      {/* Price range */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Price range</h3>
          <button className="text-gray-400">^</button>
        </div>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
        <button className="w-full text-blue-500 text-sm py-2 border border-blue-500 rounded hover:bg-blue-50">
          Apply
        </button>
      </div>

      {/* Condition */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Condition</h3>
          <button className="text-gray-400">^</button>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <input type="radio" name="condition" className="w-4 h-4" defaultChecked />
            <label className="text-sm text-gray-700">Any</label>
          </li>
          <li className="flex items-center gap-2">
            <input type="radio" name="condition" className="w-4 h-4" />
            <label className="text-sm text-gray-700">Refurbished</label>
          </li>
          <li className="flex items-center gap-2">
            <input type="radio" name="condition" className="w-4 h-4" />
            <label className="text-sm text-gray-700">Brand new</label>
          </li>
          <li className="flex items-center gap-2">
            <input type="radio" name="condition" className="w-4 h-4" />
            <label className="text-sm text-gray-700">Old items</label>
          </li>
        </ul>
      </div>

      {/* Ratings */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Ratings</h3>
          <button className="text-gray-400">^</button>
        </div>
        <ul className="space-y-2">
          {ratings.map((rating, index) => (
            <li key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < rating.filled ? 'text-orange-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
