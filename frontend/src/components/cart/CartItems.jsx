import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartItems = () => {
  const { cart, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()
  const cartItems = cart.items || []

  const handleRemove = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      await removeFromCart(productId)
    }
  }

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear all items from your cart?')) {
      await clearCart()
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
        <div className="text-6xl mb-4">🛒</div>
        <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 ease-out font-medium transform"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {cartItems.map((item) => {
        const product = item.product || {}
        const productId = product._id || product.id
        // Use cart item ID or product ID depending on what backend expects
        const removeId = item._id || productId
        
        console.log('Cart item:', { itemId: item._id, productId, removeId });
        
        return (
          <div key={item._id || productId} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 hover:shadow-xl hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 ease-out transform">
            {/* Product Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 p-3 border border-gray-100">
              <img 
                src={product.image || product.imageUrl} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium mb-2">{product.name}</h3>
              {product.category && (
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Category: {product.category}
                </p>
              )}
              {product.description && (
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">
                  {product.description}
                </p>
              )}
              {product.stock !== undefined && (
                <p className="text-xs text-gray-500 mb-2">
                  Stock: {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                </p>
              )}
              <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => handleRemove(productId)}
                  className="text-red-500 text-sm hover:text-red-700 font-medium transition-colors flex items-center gap-1"
                  title={`Remove (ID: ${productId})`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3">
              <span className="text-lg sm:text-xl font-bold text-blue-600">${product.price?.toFixed(2) || '0.00'}</span>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                <span className="text-sm text-gray-600">Qty:</span>
                <span className="font-semibold text-gray-900">
                  {item.quantity}
                </span>
              </div>
            </div>
          </div>
        )
      })}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 flex-wrap gap-3">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:gap-3 font-medium transition-all duration-300 ease-out"
        >
          <svg className="w-5 h-5 transition-transform duration-300 hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Continue Shopping
        </button>
        <button 
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 hover:scale-105 font-medium transition-all duration-300 ease-out flex items-center gap-1 transform"
        >
          <svg className="w-4 h-4 transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear Cart
        </button>
      </div>
    </div>
  )
}

export default CartItems
