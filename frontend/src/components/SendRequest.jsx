import React from 'react'
import bgImg from '../assets/bgImg.png'
const SendRequest = () => {
  return (
    <div 
     style={{ backgroundImage: `url(${bgImg})` }}className="px-3 sm:px-6 pb-3 sm:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Section - Blue Card */}
        <div className=" rounded-lg p-q6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            An easy way to send<br />requests to all suppliers
          </h2>
          <p className="text-xs sm:text-sm mb-6 opacity-90">
            Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sed accusantium repellendus esse explicabo ducimus illum fugit blanditiis, quis reiciendis. consectetur adipisicing elit, sed do eiusmod tempor incididunt.
          </p>
       
        </div>

        {/* Right Section - Form */}
        <div className=" rounded-lg p-6 sm:p-8 text-white">
          <form className="space-y-3 sm:space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl text-black font-bold mb-4 sm:mb-6">Send quote to suppliers</h2>
  <input
    type="text"
    placeholder="What item you need?"
    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
  />
  
  <textarea
    placeholder="Type more details"
    rows="3"
    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-sm sm:text-base"
  ></textarea>
  
  <div className="grid grid-cols-2 gap-3 sm:gap-4">
    <input
      type="text"
      placeholder="Quantity"
      className="px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
    />
    <select className="px-3 sm:px-4 py-2 sm:py-3 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base">
      <option>Pcs</option>
    </select>
  </div>
  
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 font-medium text-sm sm:text-base transition-colors"
  >
    Send Inquiry
  </button>
</form>

        </div>
      </div>
    </div>
  )
}

export default SendRequest
