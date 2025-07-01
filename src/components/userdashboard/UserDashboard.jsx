import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const UserDashboard = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  // Menu items array for navigation
  const menuItems = [
    {
      id: "booking",
      label: "New Booking",
      icon: "➕",
      description: "Book a new room",
    },
    {
      id: "rooms",
      label: "Current Rooms",
      icon: "🏨",
      description: "View your booked rooms",
    },
  ];

  // Logout handler with confirmation dialog
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
      // Add your logout logic here (clear tokens, redirect, etc.)
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full sm:w-80 w-full max-w-[320px] bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 p-4 sm:p-6 transition-transform duration-300 z-40 flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-[100%]"}
      `}
    >
      {/* Toggle Arrow Button (always visible on the right edge) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 -right-8 sm:-right-10 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 border border-gray-700 rounded-r-md flex items-center justify-center text-white shadow-lg hover:bg-gray-700 transition-colors duration-300"
        title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? (
          <FiChevronLeft size={18} className="sm:w-6 sm:h-6" />
        ) : (
          <FiChevronRight size={18} className="sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Menu content (hidden/shown with opacity) */}
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          User Dashboard
        </h2>

        {/* Menu Items */}
        <div className="flex-1">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`cursor-pointer p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 transition-colors ${
                activeTab === item.id
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl sm:text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {item.label}
                  </p>
                  <p className="text-xs sm:text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-600 pt-4 sm:pt-6 mt-4">
          <div className="flex items-center space-x-3 mb-3 sm:mb-4">
            {/* User Avatar */}
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face&auto=format&q=80"
              alt="User Avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-600 object-cover"
            />
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-xs sm:text-sm truncate">
                John Doe
              </h4>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-300 text-xs sm:text-sm"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
