import React from 'react'
import { FaIndustry, FaPalette, FaBox, FaCheckCircle } from 'react-icons/fa'

const OurServices = () => {
  const services = [
    {
      title: 'Source from Industry Hubs',
      icon: FaIndustry
    },
    {
      title: 'Customize Your Products',
      icon: FaPalette
    },
    {
      title: 'Fast, reliable shipping by ocean or air',
      icon: FaBox
    },
    {
      title: 'Product monitoring and inspection',
      icon: FaCheckCircle
    }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Our extra services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gray-100 h-32 sm:h-48 flex items-center justify-center">
                <IconComponent className="text-4xl sm:text-6xl text-gray-600" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-sm font-medium">{service.title}</h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OurServices
