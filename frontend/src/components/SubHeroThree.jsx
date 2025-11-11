import React from 'react';

const SubHeroThree = () => {
  return (
    <div className="bg-sky-50 py-3 rounded">
      <div className="flex flex-col items-center gap-4 px-4 ">
        
        {/* Top Section: Avatar + Greeting + Buttons */}
        <div className="flex flex-col items-center gap-3 text-center ">
          <img src="/assets/Avatar.png" alt="Avatar" className="w-16 h-16 rounded-full" /> {/* smaller avatar */}
          <p className="text-lg font-semibold text-gray-800">
            Hi, User! <br /> Let's get Started
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
            <button className="cursor-pointer bg-blue-700 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto">
              Join Now
            </button>
            <button className="cursor-pointer bg-white text-blue-700 border border-blue-700 font-medium px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 w-full sm:w-auto">
              Login
            </button>
          </div>
        </div>

        {/* Images Section */}
        <div className="flex flex-col gap-3 w-full items-center mt-2">
          <img src="/assets/block (2).png" alt="Block" className="w-full max-w-[200px] rounded-lg shadow-md" /> {/* smaller image */}
          <img src="/assets/highers.png" alt="Block One" className="w-full max-w-[200px] rounded-lg shadow-md" /> 
        </div>

      </div>
    </div>
  );
};

export default SubHeroThree;
