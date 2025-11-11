import React from 'react'
import CartHeader from '../components/cart/CartHeader'
import CartItems from '../components/cart/CartItems'
import CartSummary from '../components/cart/CartSummary'
import CartFeatures from '../components/cart/CartFeatures'
import SavedForLater from '../components/cart/SavedForLater'
import DiscountBanner from '../components/cart/DiscountBanner'
import Footer from '../components/Footer'

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CartHeader />
      
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My cart (3)</h1>
        
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
