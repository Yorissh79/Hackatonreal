import React from "react";

const UserHeader = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-md"
      style={{ height: 64 }} // 64px header yüksekliği
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo or Brand */}
        <div className="text-white text-2xl font-bold select-none">
          Hotel Booking
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="/"
            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
          >
            Rooms
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
          >
            Services
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;
