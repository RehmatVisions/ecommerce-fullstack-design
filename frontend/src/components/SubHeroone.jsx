import React, { useState } from 'react';

const SubHeroone = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = [
    "AutoMobiles",
    "Clothes & wear",
    "Home Interiors",
    "Computer And Wear",
    "Tools & Equipments",
    "Sports & Outdoors",
    "Animal and Pets",
    "Machinery Tools",
    "More Categories"
  ];

  return (
    <div className="w-full max-w-[220px] lg:max-w-[250px] bg-white rounded-lg  overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
              cursor-pointer px-3 py-3 text-gray-700 text-sm
              ${activeIndex === index ? 'bg-sky-400 text-white font-semibold' : 'hover:bg-sky-100'}
              transition-colors duration-200
            `}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubHeroone;
