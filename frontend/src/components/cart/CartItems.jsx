import React from 'react'
import item1 from '../../assets/Item (2).png'
import item2 from '../../assets/Item (11).png'
import item3 from '../../assets/watch (2).png'

const CartItems = () => {
  const cartItems = [
    {
      id: 1,
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artel Market',
      price: 78.99,
      quantity: 9,
      image: item1
    },
    {
      id: 2,
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Best factory LLC',
      price: 39.00,
      quantity: 3,
      image: item2
    },
    {
      id: 3,
      name: 'T-shirts with multiple colors, for men and lady',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      seller: 'Artel Market',
      price: 170.50,
      quantity: 1,
      image: item3
    }
  ]

  return (
    <div className="space-y-3 sm:space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="bg-white rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Product Image */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 p-2">
            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-medium mb-2">{item.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Size: {item.size}, Color: {item.color}, Material: {item.material}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Seller: {item.seller}</p>
            <div className="flex gap-2">
              <button className="text-red-500 text-xs sm:text-sm hover:underline">Remove</button>
              <button className="text-blue-500 text-xs sm:text-sm hover:underline">Save for later</button>
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between">
            <span className="text-base sm:text-lg font-bold">${item.price.toFixed(2)}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600">Qty:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm">
                <option>{item.quantity}</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 flex-wrap gap-2">
        <button className="flex items-center gap-2 text-blue-500 hover:underline text-sm">
          <span>←</span> Back to shop
        </button>
        <button className="text-blue-500 hover:underline text-sm">Remove all</button>
      </div>
    </div>
  )
}

export default CartItems
