import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../redux/reducers/roomSlice";
import UserDashboard from "../../components/userdashboard/UserDashboard";
import UserHeader from "../../components/userheader/UserHeader";

const User = () => {
  const [activeTab, setActiveTab] = useState("booking");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.room.rooms);
  const loading = useSelector((state) => state.room.loading);
  const error = useSelector((state) => state.room.error);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleBooking = (roomNumber) => {
    alert(`Room ${roomNumber} booking clicked!`);
  };

  return (
    <>
      <UserHeader />

      <div className="flex h-screen overflow-hidden bg-black relative pt-16">
        {/* Sidebar */}
        <UserDashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content area */}
        <div className="flex-1 w-full overflow-y-auto">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {activeTab === "booking" && (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 pt-6">
              <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Hotel Rooms
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
                  <p className="text-gray-400 mt-4 text-lg">
                    Discover comfort and luxury in our premium accommodations
                  </p>
                </div>

                {/* Error or loading */}
                {loading && <p className="text-white text-center mb-6">Loading rooms...</p>}
                {error && <p className="text-red-500 text-center mb-6">Error: {error}</p>}

                {/* Statistics */}
                {!loading && !error && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
                        <p className="text-gray-400 text-sm uppercase">Total Rooms</p>
                        <p className="text-2xl font-bold text-white">{rooms.length}</p>
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

                    {/* Rooms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rooms.map((room) => (
                        <div
                          key={room.id}
                          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600 overflow-hidden hover:border-gray-500 transition-all duration-300 hover:scale-105"
                        >
                          <div className="p-6">
                            <div className="flex justify-between mb-4">
                              <h3 className="text-xl font-bold text-white">
                                {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room
                              </h3>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-white">${room.price}</p>
                                <p className="text-gray-400 text-sm">per night</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 mb-6 text-gray-400 text-sm">
                              <span>👥 {room.type === "double" ? "2 Guests" : "1 Guest"}</span>
                              <span>🛏️ {room.type === "double" ? "King Bed" : "Single Bed"}</span>
                            </div>

                            <button
                              onClick={() => handleBooking(room.number)}
                              disabled={room.status !== "available"}
                              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                                room.status === "available"
                                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {room.status === "available" ? "Book Now" : "Not Available"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-12 text-gray-400">
                      <p>Need assistance? Contact our 24/7 concierge service</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === "rooms" && (
            <div className="min-h-screen bg-gray-900 text-white p-6 pt-6">
              <h2 className="text-2xl font-bold mb-4">My Booked Rooms</h2>
              <p>You haven't booked any rooms yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
