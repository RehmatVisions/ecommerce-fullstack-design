import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const categories = [
    'Electronics',
    'Fashion & Apparel',
    'Home & Garden',
    'Computers & Tech',
    'Sports & Fitness',
    'Beauty & Health',
    'Toys & Games',
    'Books & Media',
    'More Categories'
  ]

  return (
    <aside className="hidden lg:block w-48 xl:w-56 bg-white rounded-lg p-3 flex-shrink-0">
      <ul className="space-y-1.5">
        {categories.map((category, index) => (
          <li key={index}>
            <Link 
              to={`/products?category=${encodeURIComponent(category)}`}
              className="text-gray-700 hover:text-blue-500 text-sm block py-1.5 hover:bg-gray-50 px-2 rounded transition-colors"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
