import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import HeroSection from '../components/HeroSection'
import DealsSection from '../components/DealsSection'
import HomeGadgets from '../components/HomeGadgets'
import ComputerSection from '../components/ComputerSection'
import SendRequest from '../components/SendRequest'
import RecommendedItems from '../components/RecommendedItems'
import OurServices from '../components/OurServices'
import SuppliersByRegion from '../components/SuppliersByRegion'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function HomePage({ onProductClick }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        {/* Hero Section with Sidebar */}
        <div className="flex gap-4 mb-6">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <HeroSection />
          </div>
        </div>

        {/* Main Content - Full Width */}
        <main>
          <DealsSection onProductClick={onProductClick} />
          <HomeGadgets onProductClick={onProductClick} />
          <ComputerSection onProductClick={onProductClick} />
          <SendRequest />
          <RecommendedItems onProductClick={onProductClick} />
          <OurServices />
          <SuppliersByRegion />
          <Newsletter />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
