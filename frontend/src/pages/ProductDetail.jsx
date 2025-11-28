import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import { fetchProductById } from '../utils/api'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      const data = await fetchProductById(id)
      setProduct(data)
      setLoading(false)
    }
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6 pt-[50px] md:pt-[80px]">
          <p className="text-gray-500">Loading product...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6 pt-[50px] md:pt-[80px]">
          <p className="text-red-500">Product not found</p>
        </div>
        <Footer />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Secondary Navigation */}
      

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6 pt-[50px] md:pt-[80px]">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Left - Product Images */}
          <div className="lg:col-span-1">
            <ProductImages product={product} />
          </div>

          {/* Middle - Product Info */}
          <div className="lg:col-span-1">
            <ProductInfo product={product} />
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
