import React from 'react'
import Header from '../components/Header'
import Breadcrumb from '../components/listing/Breadcrumb'
import ProductImages from '../components/detail/ProductImages'
import ProductInfo from '../components/detail/ProductInfo'
import SupplierCard from '../components/detail/SupplierCard'
import ProductTabs from '../components/detail/ProductTabs'
import YouMayLike from '../components/detail/YouMayLike'
import RelatedProducts from '../components/detail/RelatedProducts'
import DiscountBanner from '../components/cart/DiscountBanner'
import Footer from '../components/Footer'

const ProductDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Secondary Navigation */}
      

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Left - Product Images */}
          <div className="lg:col-span-1">
            <ProductImages />
          </div>

          {/* Middle - Product Info */}
          <div className="lg:col-span-1">
            <ProductInfo />
          </div>

          {/* Right - Supplier Card */}
          <div className="lg:col-span-1">
            <SupplierCard />
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs />

        {/* You May Like */}
        <YouMayLike />

        {/* Related Products */}
        <RelatedProducts />

        {/* Discount Banner */}
        <DiscountBanner />
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetail
