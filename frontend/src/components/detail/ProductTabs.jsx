import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div className="bg-white rounded-lg mt-4 sm:mt-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-4 sm:gap-8 px-3 sm:px-6 min-w-max">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-3 sm:py-4 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'description'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-600'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 sm:py-4 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-600'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3 sm:py-4 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-600'
            }`}
          >
            Shipping
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 sm:py-4 border-b-2 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'about'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-600'
            }`}
          >
            About seller
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {activeTab === 'description' && (
          <div>
            <p className="text-xs sm:text-sm text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            <p className="text-xs sm:text-sm text-gray-700 mb-4">
              Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <div className="mt-4 sm:mt-6 overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500 w-1/3">Model</td>
                    <td className="py-3">#8786867</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Style</td>
                    <td className="py-3">Classic style</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Certificate</td>
                    <td className="py-3">ISO-898921212</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Size</td>
                    <td className="py-3">34mm x 450mm x 19mm</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-500">Memory</td>
                    <td className="py-3">36GB RAM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 sm:mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Some great feature name here</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Duis aute irure dolor in reprehenderit</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Some great feature name here</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="text-xs sm:text-sm text-gray-700">Reviews content goes here...</div>
        )}
        {activeTab === 'shipping' && (
          <div className="text-xs sm:text-sm text-gray-700">Shipping information goes here...</div>
        )}
        {activeTab === 'about' && (
          <div className="text-xs sm:text-sm text-gray-700">About seller information goes here...</div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
