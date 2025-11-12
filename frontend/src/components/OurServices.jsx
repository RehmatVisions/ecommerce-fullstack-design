import icon1 from '../assets/gone.png'
import icon2 from '../assets/image104.png'
import icon3 from '../assets/g3.png'
import icon4 from '../assets/g4.png'

const OurServices = () => {
  const services = [
    {
      title: 'Source from Industry Hubs',
      icon: icon1
    },
    {
      title: 'Customize Your Products',
      icon: icon2
    },
    {
      title: 'Fast, reliable shipping by ocean or air',
      icon: icon3
    },
    {
      title: 'Product monitoring and inspection',
      icon: icon4
    }
  ]

  return (
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Our extra services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {services.map((service, index) => (
          <div key={index} className=" border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col">
            <div className="h-32 sm:h-40 flex-shrink-0">
              <img 
                src={service.icon} 
                alt={service.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-3 sm:p-4 bg-gray-50">
              <h3 className="text-xs sm:text-sm font-medium text-center">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurServices
