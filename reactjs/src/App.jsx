import { useState } from 'react'
import HomePage from './pages/HomePage'
import ProductListing from './pages/ProductListing'
import CartPage from './pages/CartPage'
import ProductDetail from './pages/ProductDetail'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleViewDetails = () => {
    setCurrentPage('detail')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onProductClick={handleViewDetails} />
      case 'listing':
        return <ProductListing onViewDetails={handleViewDetails} />
      case 'cart':
        return <CartPage />
      case 'detail':
        return <ProductDetail />
      default:
        return <HomePage onProductClick={handleViewDetails} />
    }
  }

  return (
    <div>
      {/* Simple Navigation for Demo */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setCurrentPage('home')}
          className={`px-4 py-2 rounded shadow-lg text-sm ${
            currentPage === 'home' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage('listing')}
          className={`px-4 py-2 rounded shadow-lg text-sm ${
            currentPage === 'listing' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Listing
        </button>
        <button
          onClick={() => setCurrentPage('detail')}
          className={`px-4 py-2 rounded shadow-lg text-sm ${
            currentPage === 'detail' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Detail
        </button>
        <button
          onClick={() => setCurrentPage('cart')}
          className={`px-4 py-2 rounded shadow-lg text-sm ${
            currentPage === 'cart' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          Cart
        </button>
      </div>

      {renderPage()}
    </div>
  )
}

export default App
