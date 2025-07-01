import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="w-full text-white font-serif transition-all duration-500 hover:text-gray-800 hover:bg-white  top-0 z-50">

      <div className="flex justify-start items-center text-sm px-5 py-2 gap-4">
        <FaPhone className="text-sm cursor-pointer" />
        <FaEnvelope className="text-sm cursor-pointer" />
        <span className="font-semibold tracking-wide cursor-pointer">NEWSLETTER</span>
      </div>


      <div className="text-center my-2">
        <h1 className="text-2xl italic font-semibold">ROOMEASER</h1>
      </div>


      <hr className="border-white opacity-30" />


      <nav className="text-center py-2">
        <ul className="inline-flex gap-6 text-base tracking-wider">
          <li className="cursor-pointer hover:text-gray-400">DESTINATIONS</li>
          <li className="cursor-pointer hover:text-gray-400">EXPERIENCES</li>
          <li className="cursor-pointer hover:text-gray-400">VILLAS</li>
          <li className="cursor-pointer hover:text-gray-400">PRIVATE HOMES</li>
          <li className="cursor-pointer hover:text-gray-400">STORIES</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
