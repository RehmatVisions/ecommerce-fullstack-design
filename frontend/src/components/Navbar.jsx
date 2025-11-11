 import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-2 flex items-center justify-around sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/assets/logo-colored.png" alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Search Bar */}
      <div className="flex flex-1 mx-4 max-w-xl border-2 border-blue-600 rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-3 py-2 font-semibold rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <select className="border-l-2 border-blue-600 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="all">All Category</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors">
          Search
        </button>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <img src="/assets/Profile.png" alt="Profile" className="h-9 cursor-pointer hover:scale-110 transition-transform" />
        <img src="/assets/Message.png" alt="Message" className="h-9 cursor-pointer hover:scale-110 transition-transform" />
        <img src="/assets/Orders.png" alt="Orders" className="h-9 cursor-pointer hover:scale-110 transition-transform" />
        <img src="/assets/Cart.png" alt="Cart" className="h-9 cursor-pointer hover:scale-110 transition-transform" />
      </div>
    </nav>
  );
};

export default Navbar;
