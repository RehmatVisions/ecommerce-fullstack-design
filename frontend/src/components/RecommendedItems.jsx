// Import Link from react-router-dom to navigate between pages
import { Link } from 'react-router-dom'
// Import all product images
import item1 from '../assets/shirt.png'
import item2 from '../assets/pant.png'
import item3 from '../assets/coat.png'
import item4 from '../assets/bag.png'
import item5 from '../assets/purse.png'
import item6 from '../assets/pant.png'
import item7 from '../assets/headphone.png'
import item8 from '../assets/jacket.png'
import item9 from '../assets/mug.png'
import item10 from '../assets/flask.png'

// Component that displays recommended products
const RecommendedItems = () => {
  // Array of products with name, price, and image
  const products = [
    { name: 'T-shirts with multiple colors', price: '$10.30', image: item1 },
    { name: 'Jeans shorts for men blue', price: '$10.30', image: item2 },
    { name: 'Brown winter coat medium', price: '$12.50', image: item3 },
    { name: 'Jeans bag for travel for men', price: '$34.00', image: item4 },
    { name: 'Leather wallet', price: '$99.00', image: item5 },
    { name: 'Canon camera black, 100x zoom', price: '$9.99', image: item6 },
    { name: 'Headset for gaming with mic', price: '$8.99', image: item7 },
    { name: 'Jeans bag for travel for men', price: '$24.00', image: item8 },
    { name: 'Ceramic pot for office', price: '$10.30', image: item9 },
    { name: 'Smart watch silver color', price: '$10.30', image: item10 }
  ]

  return (
    // Main container with padding
    <div className="px-3 sm:px-6 pb-3 sm:pb-6">
      {/* Section title */}
      <h2 className="text-lg sm:text-xl font-bold mb-4">Recommended items</h2>
      
      {/* Grid layout for products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Loop through each product and display it */}
        {products.map((product, index) => (
          // Link to product detail page
          <Link
            key={index}
            to={`/product/${index + 22}`}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer block flex flex-col"
          >
            {/* Product image container */}
            <div className="h-32 sm:h-40 flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-4" 
              />
            </div>
            
            {/* Product information */}
            <div className="p-3 sm:p-4 bg-gray-50">
              {/* Product price */}
              <p className="text-base sm:text-lg font-bold mb-1">{product.price}</p>
              {/* Product name */}
              <p className="text-xs sm:text-sm text-gray-600">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Export component so it can be used in other files
export default RecommendedItems
