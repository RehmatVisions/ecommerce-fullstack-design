import React from 'react'

const CartSummary = () => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 lg:sticky lg:top-6">
      {/* Coupon Section */}
      <div className="mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-gray-600 mb-3">Have a coupon?</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add coupon"
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:border-blue-500"
          />
          <button className="px-3 sm:px-4 py-2 text-blue-500 border border-blue-500 rounded text-xs sm:text-sm hover:bg-blue-50 whitespace-nowrap">
            Apply
          </button>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">$1403.97</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Discount:</span>
          <span className="text-red-500">- $60.00</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Tax:</span>
          <span className="text-green-600">+ $14.00</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <span className="text-sm sm:text-base font-medium">Total:</span>
        <span className="text-xl sm:text-2xl font-bold">$1357.97</span>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-green-500 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-green-600 mb-4 text-sm sm:text-base">
        Checkout
      </button>

      {/* Payment Methods */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' fill='%23ccc'%3E%3Crect width='32' height='20' rx='2'/%3E%3C/svg%3E" alt="Payment" className="h-4 sm:h-5" />
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' fill='%23ccc'%3E%3Crect width='32' height='20' rx='2'/%3E%3C/svg%3E" alt="Payment" className="h-4 sm:h-5" />
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' fill='%23ccc'%3E%3Crect width='32' height='20' rx='2'/%3E%3C/svg%3E" alt="Payment" className="h-4 sm:h-5" />
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' fill='%23ccc'%3E%3Crect width='32' height='20' rx='2'/%3E%3C/svg%3E" alt="Payment" className="h-4 sm:h-5" />
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' fill='%23ccc'%3E%3Crect width='32' height='20' rx='2'/%3E%3C/svg%3E" alt="Payment" className="h-4 sm:h-5" />
      </div>
    </div>
  )
}

export default CartSummary
