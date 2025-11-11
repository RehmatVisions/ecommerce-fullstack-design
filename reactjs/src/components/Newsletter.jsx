import React from 'react'

const Newsletter = () => {
  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-6 sm:p-8 text-center">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Subscribe on our newsletter</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
          />
          <button className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-blue-600 text-sm sm:text-base whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
