import React, { useEffect, useState } from 'react'; 
import { FaPhone, FaEnvelope, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'; 
import PersonIcon from '@mui/icons-material/Person'; 
import useDarkMode from '../../hooks/useDarkmode.js'; 
import { useNavigate } from 'react-router';
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

export const Header = () => { 
  const [isScrolled, setIsScrolled] = useState(false); 
  const { isDarkMode, toggleDarkMode } = useDarkMode(); 
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { 
    const handleScroll = () => { 
      setIsScrolled(window.scrollY > 50); 
    }; 
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []); 

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('bg-gray-900');
      document.body.classList.remove('bg-white');
    } else {
      document.body.classList.add('bg-white');
      document.body.classList.remove('bg-gray-900');
    }
    return () => {
      document.body.classList.remove('bg-gray-900', 'bg-white');
    };
  }, [isDarkMode]);

  const textColor = isScrolled && !isDarkMode ? "text-black" : "text-white"; 
  const iconColor = isScrolled && !isDarkMode ? "black" : "white"; 
  const headerBg = isScrolled 
      ? (isDarkMode ? "bg-gray-800" : "bg-white shadow-md") 
      : "bg-transparent"; 

  // Menu item click helper to close mobile menu and navigate
  const handleMobileNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return ( 
    <header 
      className={`w-full h-auto font-serif transition-all duration-500 fixed top-0 z-50 ${headerBg}`} 
    > 
      <div className={`flex justify-start items-center text-sm px-4 sm:px-12 py-3 gap-3 sm:gap-4 ${textColor}`}> 

        {/* Desktop Profile Icon with dropdown */}
        <div className="hidden sm:block">
          <div className="relative inline-block cursor-pointer" tabIndex={0}>
            <Dropdown> 
            <MenuButton> 
              <PersonIcon sx={{ fontSize: 23, color: iconColor }} /> 
            </MenuButton> 
            <Menu> 
              <MenuItem onClick={() => navigate("/admin")}>Profile</MenuItem> 
              <MenuItem onClick={() => navigate("/register/signup")}>Register</MenuItem> 
              <MenuItem onClick={() => navigate("/register/login")}>Login</MenuItem> 
              <MenuItem onClick={() => navigate("/")}>Logout</MenuItem> 
            </Menu> 
          </Dropdown> 
            {/* You can add dropdown here if needed */}
          </div>
        </div>

        {/* Mobile hamburger toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="sm:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes size={23} color={iconColor} /> : <FaBars size={23} color={iconColor} />}
        </button>

        <FaPhone className="text-xs sm:text-sm cursor-pointer" /> 
        <FaEnvelope className="text-xs sm:text-sm cursor-pointer" /> 
        <span className="hidden sm:inline font-semibold tracking-wide cursor-pointer text-sm sm:text-base">NEWSLETTER</span> 

        <button onClick={toggleDarkMode} className="ml-auto"> 
          {isDarkMode 
            ? <FaSun fontSize={20} color="white" /> 
            : <FaMoon fontSize={20} color={iconColor} />} 
        </button> 
      </div> 

      <div className={`text-center my-2 ${isDarkMode ? 'text-white' : textColor}`}> 
        <h1 className="text-xl sm:text-2xl italic font-semibold">ROOMEASER</h1> 
      </div> 

      <hr className="border-gray-300 opacity-30" /> 

      {/* Desktop nav inline */}
      <nav className="text-center py-2 hidden sm:block"> 
        <ul className={`inline-flex flex-wrap justify-center gap-6 text-base tracking-wider ${isDarkMode ? 'text-white' : textColor}`}> 
          <li className="cursor-pointer hover:text-gray-500 whitespace-nowrap">DESTINATIONS</li> 
          <li className="cursor-pointer hover:text-gray-500 whitespace-nowrap">EXPERIENCES</li> 
          <li className="cursor-pointer hover:text-gray-500 whitespace-nowrap">VILLAS</li> 
          <li className="cursor-pointer hover:text-gray-500 whitespace-nowrap">PRIVATE HOMES</li> 
          <li className="cursor-pointer hover:text-gray-500 whitespace-nowrap">STORIES</li> 
        </ul> 
      </nav>

      {/* Mobile nav as dropdown panel */}
      {mobileMenuOpen && (
        <nav className={`sm:hidden bg-${isDarkMode ? 'gray-800' : 'white'} shadow-md py-3 px-6`}>
          <ul className={`flex flex-col gap-3 text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {/* Nav links */}
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/")}>DESTINATIONS</li>
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/")}>EXPERIENCES</li>
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/")}>VILLAS</li>
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/")}>PRIVATE HOMES</li>
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/")}>STORIES</li>

            {/* Divider */}
            <hr className={`my-3 border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />

            {/* Auth Links */}
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/admin")}>Profile</li>
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/register/signup")}>Register</li>
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/register/login")}>Login</li>
            <li className="cursor-pointer hover:text-gray-500" onClick={() => handleMobileNavigate("/")}>Logout</li>
          </ul>
        </nav>
      )}
    </header> 
  ); 
}; 

export default Header