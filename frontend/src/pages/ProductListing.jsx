import React from 'react'
import Header from '../components/Header'
import Breadcrumb from '../components/listing/Breadcrumb'
import Sidebar from '../components/listing/Sidebar'
import ProductGrid from '../components/listing/ProductGrid'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const ProductListing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Secondary Navigation */}
    

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Breadcrumb />
        
        <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-6">
          <Sidebar />
          <ProductGrid />
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  )
}

export default ProductListing
