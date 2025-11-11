 import React from 'react';
import bgImage from '/assets/Mask.png'; // image in src/assets

const SubHeroTwo = () => {
  return (
    <div
      className="h-[412px] w-full lg:w-[680px] bg-cover bg-center rounded-lg "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="h-full flex flex-col items-center lg:items-start justify-center gap-4 px-4 lg:px-10">
        <h2 className="text-black text-xl font-semibold lg:mr-0 text-center lg:text-left">
          Latest Trending
        </h2>
        <h1 className="text-black text-4xl font-bold text-center lg:text-left">
          Electronics Item
        </h1>
        <button className="bg-white cursor-pointer text-black font-medium px-6 py-2 rounded-lg hover:bg-gray-200 transition duration-300 self-center lg:self-start">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default SubHeroTwo;
