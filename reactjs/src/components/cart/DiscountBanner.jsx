import React from 'react'

const DiscountBanner = () => {
  return (
    <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
      <div>
        <h2 className="text-lg sm:text-2xl font-bold mb-2">Super discount on more than 100 USD</h2>
        <p className="text-xs sm:text-sm opacity-90">Have you ever finally just write dummy info</p>
      </div>
      <button className="bg-orange-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-orange-600 text-sm sm:text-base whitespace-nowrap">
        Shop now
      </button>
    </div>
  )
}

export default DiscountBanner
