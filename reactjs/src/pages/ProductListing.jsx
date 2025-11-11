import React from 'react'
import Header from '../components/Header'
import Breadcrumb from '../components/listing/Breadcrumb'
import Sidebar from '../components/listing/Sidebar'
import ProductGrid from '../components/listing/ProductGrid'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const ProductListing = ({ onViewDetails }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Secondary Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3 flex items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm overflow-x-auto">
          <button className="flex items-center gap-1 hover:text-blue-500 whitespace-nowrap">
            <span>☰</span> <span className="hidden sm:inline">All category</span>
          </button>
          <a href="#" className="hover:text-blue-500 whitespace-nowrap">Hot offers</a>
          <a href="#" className="hover:text-blue-500 whitespace-nowrap hidden sm:inline">Gift boxes</a>
          <a href="#" className="hover:text-blue-500 whitespace-nowrap hidden md:inline">Projects</a>
          <a href="#" className="hover:text-blue-500 whitespace-nowrap hidden lg:inline">Menu item</a>
          <a href="#" className="hover:text-blue-500 whitespace-nowrap">Help</a>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Breadcrumb />
        
        <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-6">
          <Sidebar />
          <ProductGrid onViewDetails={onViewDetails} />
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  )
}

export default ProductListing
