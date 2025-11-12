import americaFlag from '../assets/america.jpg'
import germanFlag from '../assets/german.jpg'
import chinaFlag from '../assets/china.png'
import denmarkFlag from '../assets/denmark.png'
import franceFlag from '../assets/france.png'
import italyFlag from '../assets/italy.png'
import arab from '../assets/arab.png'
import aus from '../assets/aus.png'
const SuppliersByRegion = () => {
  const regions = [
    { flag: arab, name: 'Arabic Emirates', company: 'shopname.ae' },
    { flag: aus, name: 'Australia', company: 'shopname.au' },
    { flag: americaFlag, name: 'United States', company: 'shopname.com' },
    { flag: franceFlag, name: 'Russia', company: 'shopname.ru' },
    { flag: italyFlag, name: 'Italy', company: 'shopname.it' },
    { flag: germanFlag, name: 'Germany', company: 'shopname.de' },
    { flag: denmarkFlag, name: 'Denmark', company: 'shopname.dk' },
    { flag: chinaFlag, name: 'China', company: 'shopname.cn' }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Suppliers by region</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {regions.map((region, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={region.flag} alt={region.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
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
