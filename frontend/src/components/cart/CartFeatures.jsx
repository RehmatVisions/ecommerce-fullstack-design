import React from 'react'
import { FaLock, FaCommentDots, FaTruck } from 'react-icons/fa'

const CartFeatures = () => {
  const features = [
    {
      icon: FaLock,
      title: 'Secure payment',
      description: 'Have you ever finally just'
    },
    {
      icon: FaCommentDots,
      title: 'Customer support',
      description: 'Have you ever finally just'
    },
    {
      icon: FaTruck,
      title: 'Free delivery',
      description: 'Have you ever finally just'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
      {features.map((feature, index) => {
        const IconComponent = feature.icon
        return (
          <div key={index} className="bg-gray-100 rounded-lg p-3 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <IconComponent className="text-xl sm:text-2xl text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-xs sm:text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CartFeatures
