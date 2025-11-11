import React from 'react'

const Sidebar = () => {
  const categories = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and tech',
    'Tools, equipments',
    'Sports and outdoor',
    'Animal and pets',
    'Machinery tools',
    'More category'
  ]

  return (
    <aside className="hidden lg:block w-48 xl:w-56 bg-white rounded-lg p-3 flex-shrink-0">
      <ul className="space-y-1.5">
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#" className="text-gray-700 hover:text-blue-500 text-sm block py-1.5 hover:bg-gray-50 px-2 rounded transition-colors">
              {category}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
