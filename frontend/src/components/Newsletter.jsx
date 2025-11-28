import React, { useState } from 'react'
import { showSuccess, showError } from '../utils/toast'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault()
    
    if (!email) {
      showError('Please enter your email')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      showSuccess('Successfully subscribed to newsletter!')
      setEmail('')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-6 sm:p-8 text-center">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Subscribe on our newsletter</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
            required
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-blue-600 hover:shadow-lg disabled:bg-gray-400 transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter
