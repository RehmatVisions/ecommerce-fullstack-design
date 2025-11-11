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
    <aside className="hidden h-[65vh] lg:block w-48 xl:w-64 bg-white border-r border-gray-200 p-4">
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={index}>
            <a href="#" className="text-gray-700 hover:text-blue-500 text-sm">
              {category}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
