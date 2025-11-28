// Import React and necessary hooks
import React, { useState, useRef } from 'react'
// Import EmailJS for sending emails
import emailjs from '@emailjs/browser'
// Import background image
import bgImg from '../assets/bgImg.png'
// Import toast notifications
import { showSuccess, showError } from '../utils/toast'

const SendRequest = () => {
  // Form state variables
  const [itemName, setItemName] = useState('')
  const [details, setDetails] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('Pcs')
  const [loading, setLoading] = useState(false)
  
  // Reference to the form element
  const formRef = useRef()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent page reload
    
    // Validate form fields
    if (!itemName || !details || !quantity) {
      showError('Please fill in all fields')
      return
    }

    setLoading(true) // Show loading state

    // EmailJS configuration - Connected and Ready! ✅
    const serviceID = 'service_x6kp0jm' // Your EmailJS service ID
    const templateID = 'template_sl9oiv5' // Your EmailJS template ID
    const publicKey = 'HjtNI0vYBWsimtaOh' // Your EmailJS public key

    // Prepare email data
    const templateParams = {
      to_email: 'itsrehmet@gmail.com',
      item_name: itemName,
      details: details,
      quantity: quantity,
      unit: unit,
      from_name: 'E-commerce Customer',
      message: `
        Item Requested: ${itemName}
        Details: ${details}
        Quantity: ${quantity} ${unit}
      `
    }

    try {
      // Send email using EmailJS
      await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      )
      
      // Show success message
      showSuccess('Quote sent successfully! We will contact you soon.')
      
      // Clear form fields
      setItemName('')
      setDetails('')
      setQuantity('')
      setUnit('Pcs')
      
    } catch (error) {
      console.error('Email send error:', error)
      showError('Failed to send quote. Please try again.')
    } finally {
      setLoading(false) // Hide loading state
    }
  }

  return (
    <div 
      style={{ backgroundImage: `url(${bgImg})` }}
      className="px-3 sm:px-6 pb-3 sm:pb-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Left Section - Information Card */}
        <div className="rounded-lg p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            An easy way to send<br />requests to all suppliers
          </h2>
          <p className="text-xs sm:text-sm mb-6 opacity-90">
            Send your product requirements to multiple suppliers at once. 
            Fill out the form with your needs, and we'll forward your request 
            to our network of trusted suppliers who will get back to you with 
            competitive quotes.
          </p>
          
          {/* Benefits list */}
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Fast response from suppliers</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Compare multiple quotes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Best prices guaranteed</span>
            </li>
          </ul>
        </div>

        {/* Right Section - Quote Request Form */}
        <div className="rounded-lg p-6 sm:p-8">
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-3 sm:space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg sm:text-xl text-black font-bold mb-4 sm:mb-6">
              Send quote to suppliers
            </h2>
            
            {/* Item Name Input */}
            <input
              type="text"
              placeholder="What item you need?"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm sm:text-base"
              required
            />
            
            {/* Details Textarea */}
            <textarea
              placeholder="Type more details (specifications, requirements, etc.)"
              rows="3"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 resize-none text-sm sm:text-base"
              required
            ></textarea>
            
            {/* Quantity and Unit */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm sm:text-base"
                required
                min="1"
              />
              <select 
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 text-sm sm:text-base"
              >
                <option>Pcs</option>
                <option>Box</option>
                <option>Kg</option>
                <option>Liter</option>
                <option>Meter</option>
                <option>Set</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-sm sm:text-base transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Inquiry'
              )}
            </button>
            
            {/* Privacy note */}
            <p className="text-xs text-gray-500 text-center mt-2">
              Your information will be sent securely to our suppliers
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SendRequest
