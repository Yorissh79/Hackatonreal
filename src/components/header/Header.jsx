import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import useDarkMode from '../../hooks/useDarkmode.js'; // Assuming useDarkMode.js is in the same directory

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Combine scrolled and dark mode conditions for text and icon colors
  const textColor = isScrolled && !isDarkMode ? "text-black" : "text-white";
  const iconColor = isScrolled && !isDarkMode ? "black" : "white";
  const headerBg = isScrolled
      ? (isDarkMode ? "bg-gray-800" : "bg-white shadow-md")
      : "bg-transparent";

  return (
      <header
          className={`w-full h-auto font-serif transition-all duration-500 fixed top-0 z-50 ${headerBg}`}
      >
        <div className={`flex justify-start items-center text-sm px-5 py-2 gap-4 ${textColor}`}>
          <Dropdown>
            <MenuButton>
              <PersonIcon sx={{ fontSize: 23, color: iconColor }} />
            </MenuButton>
            <Menu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Register</MenuItem>
              <MenuItem>Login</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Dropdown>

          <FaPhone className="text-sm cursor-pointer" />
          <FaEnvelope className="text-sm cursor-pointer" />
          <span className="font-semibold tracking-wide cursor-pointer">NEWSLETTER</span>

          {/* Dark Mode Toggle Button */}
          <button onClick={toggleDarkMode} className="ml-auto">
            {isDarkMode ? <FaSun color="white" /> : <FaMoon color={iconColor} />}
          </button>
        </div>

        <div className={`text-center my-2 ${isDarkMode ? 'text-white' : textColor}`}>
          <h1 className="text-2xl italic font-semibold">ROOMEASER</h1>
        </div>

        <hr className="border-gray-300 opacity-30" />

        <nav className="text-center py-2">
          <ul className={`inline-flex gap-6 text-base tracking-wider ${isDarkMode ? 'text-white' : textColor}`}>
            <li className="cursor-pointer hover:text-gray-500">DESTINATIONS</li>
            <li className="cursor-pointer hover:text-gray-500">EXPERIENCES</li>
            <li className="cursor-pointer hover:text-gray-500">VILLAS</li>
            <li className="cursor-pointer hover:text-gray-500">PRIVATE HOMES</li>
            <li className="cursor-pointer hover:text-gray-500">STORIES</li>
          </ul>
        </nav>
      </header>
  );
};

export default Header;