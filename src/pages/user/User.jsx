import React, { useState } from "react";
import UserDashboard from "../../components/userdashboard/UserDashboard";

const User = () => {
  // State to track the currently active tab ("booking" or "rooms")
  const [activeTab, setActiveTab] = useState("booking");
  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sample rooms data
  const rooms = [
    { id: 1, number: 101, type: "double", status: "available", price: 120 },
    { id: 2, number: 102, type: "single", status: "occupied", price: 80 },
    { id: 3, number: 103, type: "double", status: "available", price: 150 },
    { id: 4, number: 104, type: "single", status: "occupied", price: 90 },
    { id: 5, number: 105, type: "double", status: "available", price: 130 },
  ];

  // Booking button handler - alerts room number when clicked
  const handleBooking = (roomNumber) => {
    alert(`Room ${roomNumber} booking clicked!`);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black relative">
      {/* Sidebar container with absolute positioning for overlay effect */}
      <div className="absolute top-0 left-0 h-full z-50">
        <UserDashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main content area taking full width */}
      <div className="flex-1 w-full overflow-y-auto">
        {/* Overlay background shown when sidebar is open on small screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Booking tab content */}
        {activeTab === "booking" && (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 pt-16">
            <div className="max-w-6xl mx-auto">
              {/* Header section */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Hotel Rooms
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
                <p className="text-gray-400 mt-4 text-lg">
                  Discover comfort and luxury in our premium accommodations
                </p>
              </div>

              {/* Statistics cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
                  <p className="text-gray-400 text-sm uppercase">Total Rooms</p>
                  <p className="text-2xl font-bold text-white">
                    {rooms.length}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-xl p-6 border border-green-600">
                  <p className="text-green-200 text-sm uppercase">Available</p>
                  <p className="text-2xl font-bold text-white">
                    {rooms.filter((r) => r.status === "available").length}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-800 to-red-700 rounded-xl p-6 border border-red-600">
                  <p className="text-red-200 text-sm uppercase">Occupied</p>
                  <p className="text-2xl font-bold text-white">
                    {rooms.filter((r) => r.status === "occupied").length}
                  </p>
                </div>
              </div>

              {/* Rooms grid displaying each room */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600 overflow-hidden hover:border-gray-500 transition-all duration-300 hover:scale-105"
                  >
                    <div className="p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {room.type.charAt(0).toUpperCase() +
                            room.type.slice(1)}{" "}
                          Room
                        </h3>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            ${room.price}
                          </p>
                          <p className="text-gray-400 text-sm">per night</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-6 text-gray-400 text-sm">
                        <span>
                          👥 {room.type === "double" ? "2 Guests" : "1 Guest"}
                        </span>
                        <span>
                          🛏️{" "}
                          {room.type === "double" ? "King Bed" : "Single Bed"}
                        </span>
                      </div>

                      {/* Book button disabled if room is not available */}
                      <button
                        onClick={() => handleBooking(room.number)}
                        disabled={room.status !== "available"}
                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                          room.status === "available"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gray-700 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {room.status === "available"
                          ? "Book Now"
                          : "Not Available"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer message */}
              <div className="text-center mt-12 text-gray-400">
                <p>Need assistance? Contact our 24/7 concierge service</p>
              </div>
            </div>
          </div>
        )}

        {/* Booked rooms tab content */}
        {activeTab === "rooms" && (
          <div className="min-h-screen bg-gray-900 text-white p-6 pt-16">
            <h2 className="text-2xl font-bold mb-4">My Booked Rooms</h2>
            <p>You haven't booked any rooms yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
