import React from 'react'
import SubHeroone from './SubHeroone'
import SubHeroTwo from './SubHeroTwo'
import SubHeroThree from './SubHeroThree'

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 max-w-7xl mx-auto">
      
      {/* Bordered container */}
      <div className="flex flex-col lg:flex-row items-center justify-around gap-6 w-full border-2 border-gray-300 rounded-lg p-4">
        
        {/* Sub Hero One */}
        <div className="w-full lg:w-1/3">
          <SubHeroone />
        </div>

        {/* Sub Hero Two */}
        <div className="w-full lg:w-1/3 md:mr-60 ">
          <SubHeroTwo />
        </div>

        {/* Sub Hero Three */}
        <div className="w-full ml-9 lg:w-1/3">
          <SubHeroThree />
        </div>

      </div>
    </div>
  )
}

export default HeroSection
