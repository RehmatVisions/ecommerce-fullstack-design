import React from 'react'

const SuppliersByRegion = () => {
  const regions = [
    { flag: '🇦🇪', name: 'Arabic Emirates', company: 'shopname.ae' },
    { flag: '🇦🇺', name: 'Australia', company: 'shopname.au' },
    { flag: '🇺🇸', name: 'United States', company: 'shopname.com' },
    { flag: '🇷🇺', name: 'Russia', company: 'shopname.ru' },
    { flag: '🇮🇹', name: 'Italy', company: 'shopname.it' },
    { flag: '🇩🇪', name: 'Germany', company: 'shopname.de' },
    { flag: '🇫🇷', name: 'France', company: 'shopname.fr' },
    { flag: '🇨🇳', name: 'China', company: 'shopname.cn' }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Suppliers by region</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {regions.map((region, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl">{region.flag}</span>
              <div>
                <h3 className="text-xs sm:text-sm font-medium">{region.name}</h3>
                <p className="text-xs text-gray-500">{region.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuppliersByRegion
