import React from 'react'

const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <a href="/" className="hover:text-blue-500">Home</a>
      <span>›</span>
      <a href="#" className="hover:text-blue-500">Clothings</a>
      <span>›</span>
      <a href="#" className="hover:text-blue-500">Men's wear</a>
      <span>›</span>
      <span className="text-gray-700">Summer clothing</span>
    </div>
  )
}

export default Breadcrumb
