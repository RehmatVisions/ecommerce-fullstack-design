import React from 'react'
import CartHeader from '../components/cart/CartHeader'
import CartItems from '../components/cart/CartItems'
import CartSummary from '../components/cart/CartSummary'
import CartFeatures from '../components/cart/CartFeatures'
import SavedForLater from '../components/cart/SavedForLater'
import DiscountBanner from '../components/cart/DiscountBanner'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { cart, loading } = useCart()
  const cartCount = cart.items?.length || 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CartHeader />
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-6 sm:py-8 pt-[60px]">
          <p className="text-gray-500">Loading cart...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />
      
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-6 sm:py-8 pt-[60px]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My cart ({cartCount})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Section - Cart Items */}
          <div className="lg:col-span-2">
            <CartItems />
            <CartFeatures />
          </div>
          
          {/* Right Section - Cart Summary */}
          <div>
            <CartSummary />
          </div>
        </div>

        <SavedForLater />
        <DiscountBanner />
      </div>

      <Footer />
    </div>
  )
}

export default CartPage
