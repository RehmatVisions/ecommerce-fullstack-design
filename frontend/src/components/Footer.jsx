import React from 'react'
import { Link } from 'react-router-dom'
import { FaApple, FaGooglePlay, FaGlobe, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'
import logo from '../assets/logo-symbol.png'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded flex items-center justify-center">
                <img src={logo} alt="Brand Logo" className="w-full h-full" />
              </div>
              <span className="text-blue-500 font-bold text-lg sm:text-xl">Brand</span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                <FaFacebookF className="text-xs sm:text-sm" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition">
                <FaTwitter className="text-xs sm:text-sm" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition">
                <FaLinkedinIn className="text-xs sm:text-sm" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition">
                <FaInstagram className="text-xs sm:text-sm" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                <FaYoutube className="text-xs sm:text-sm" />
              </a>
            </div>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">About</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-blue-500">About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-500">Find store</Link></li>
              <li><Link to="/products" className="hover:text-blue-500">Categories</Link></li>
              <li><a href="#newsletter" onClick={(e) => { e.preventDefault(); document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 cursor-pointer">Blogs</a></li>
            </ul>
          </div>

          {/* Partnership Column */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Partnership</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-blue-500">About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-500">Find store</Link></li>
              <li><Link to="/products" className="hover:text-blue-500">Categories</Link></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 cursor-pointer">Services</a></li>
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Information</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li><a href="#newsletter" onClick={(e) => { e.preventDefault(); document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 cursor-pointer">Help Center</a></li>
              <li><Link to="/cart" className="hover:text-blue-500">Money Refund</Link></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 cursor-pointer">Shipping</a></li>
              <li><a href="#newsletter" onClick={(e) => { e.preventDefault(); document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-blue-500 cursor-pointer">Contact us</a></li>
            </ul>
          </div>

          {/* For users Column */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">For users</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openLogin'))} className="hover:text-blue-500 text-left">Login</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openRegister'))} className="hover:text-blue-500 text-left">Register</button></li>
              <li><Link to="/" onClick={scrollToTop} className="hover:text-blue-500">Settings</Link></li>
              <li><Link to="/cart" className="hover:text-blue-500">My Orders</Link></li>
            </ul>
          </div>
        </div>

        {/* App Download Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-gray-200">
          <div>
            <h3 className="font-bold mb-2 text-sm sm:text-base">Get app</h3>
            <div className="flex gap-2">
              <div className="bg-black text-white px-3 sm:px-4 py-2 rounded text-xs flex items-center gap-2">
                <FaApple className="text-base" />
                <div>App Store</div>
              </div>
              <div className="bg-black text-white px-3 sm:px-4 py-2 rounded text-xs flex items-center gap-2">
                <FaGooglePlay className="text-base" />
                <div>Google Play</div>
              </div>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            © 2023 Ecommerce.
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
              <FaGlobe />
              <span>English</span>
            </div>
            <select className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1">
              <option>USD</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
