 import React from 'react';
import { HiMenu } from 'react-icons/hi';
const SubNav = () => {
  return (
    <div className="bg-gray-100 shadow-sm">
      <nav className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-around px-1 py-2 space-y-2 md:space-y-0">
        
        {/* Left: Menu Items */}
        <ul className="flex flex-wrap space-x-4 md:space-x-15 text-gray-700 font-medium text-sm">
          <li className="hover:text-blue-600 cursor-pointer font-bold transition-colors duration-200 flex justify-around items-center">      <HiMenu size={25} className="cursor-pointer text-gray-700 hover:text-blue-600" />All Category</li>
          <li className="hover:text-blue-600 cursor-pointer font-bold transition-colors duration-200">Hot Offers</li>
          <li className="hover:text-blue-600 cursor-pointer font-bold transition-colors duration-200">Gift Boxes</li>
          <li className="hover:text-blue-600 cursor-pointer font-bold transition-colors duration-200">Projects</li>
          <li className="hover:text-blue-600 cursor-pointer font-bold transition-colors duration-200">Menu Item</li>
          <li className="hover:text-blue-600 cursor-pointer font-bold transition-colors duration-200">Help</li>
        </ul>

        {/* Right: Language / Currency + Ship To */}
        <div className="flex space-x-2">
          {/* Language / Currency */}
          <select className=" rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option value="en-us font-bold">English / USD</option>
            <option value="de-eur font-bold">German / EUR</option>
          </select>

          {/* Ship To Dropdown with Flags */}
          <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option value="AT">Ship To Austria</option>
            <option value="MA">Ship To Morocco</option>
            <option value="CN">Ship To China</option>
            <option value="IT">Ship To Italy</option>
          </select>
        </div>
      </nav>
    </div>
  );
};

export default SubNav;
