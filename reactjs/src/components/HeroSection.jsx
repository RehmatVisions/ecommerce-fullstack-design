import React from 'react'
import BannerImg from '../assets/Mask.png';
import avatar from '../assets/avatar.png';
const HeroSection = () => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Hero Banner */}
        <div   style={{ backgroundImage: `url(${BannerImg})` }}
         className="lg:col-span-2 rounded-lg p-6 sm:p-8 relative overflow-hidden min-h-[250px] sm:min-h-[300px]">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Latest trending
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Electronic items
            </h2>
            <button className="bg-white text-gray-800 px-4 sm:px-6 py-2 rounded hover:bg-gray-100 text-sm sm:text-base">
              Learn more
            </button>
          </div>
          {/* Headphones Image Placeholder */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64  rounded-full opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 ">
          {/* User Card */}
          <div className="bg-blue-400 text-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-full"><img src={avatar} alt="" /></div>
              <div>
                <p className="text-sm">Hi, user</p>
                <p className="text-xs">let's get started</p>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600 text-sm">
              Join now
            </button>
            <button className="w-full bg-white text-blue-500 py-2 rounded mt-2 hover:bg-gray-100 text-sm">
              Log in
            </button>
          </div>

          {/* Promo Card */}
          <div className="bg-orange-400 text-white rounded-lg p-4">
            <p className="text-sm mb-1">Get US $10 off</p>
            <p className="text-xs mb-3">with a new supplier</p>
          </div>

          {/* Another Promo Card */}
          <div className="bg-teal-500 text-white rounded-lg p-4 ">
            <p className="text-sm mb-1">Send quotes with</p>
            <p className="text-xs">supplier preferences</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
