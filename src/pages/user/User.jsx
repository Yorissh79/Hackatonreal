import React from "react";

const User = () => {
  const rooms = [
    { id: 1, number: 101, type: "double", status: "available", price: 120 },
    { id: 2, number: 102, type: "single", status: "occupied", price: 80 },
    { id: 3, number: 103, type: "double", status: "available", price: 150 },
    { id: 4, number: 104, type: "single", status: "occupied", price: 90 },
    { id: 5, number: 105, type: "double", status: "available", price: 130 },
  ];

  const handleBooking = (roomNumber) => {
    alert(`Room ${roomNumber} booking clicked!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  Total Rooms
                </p>
                <p className="text-2xl font-bold text-white">{rooms.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏨</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-xl p-6 border border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm uppercase tracking-wide">
                  Available
                </p>
                <p className="text-2xl font-bold text-white">
                  {rooms.filter((room) => room.status === "available").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-800 to-red-700 rounded-xl p-6 border border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm uppercase tracking-wide">
                  Occupied
                </p>
                <p className="text-2xl font-bold text-white">
                  {rooms.filter((room) => room.status === "occupied").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🚫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600 overflow-hidden hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Room Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}{" "}
                    Room
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      ${room.price}
                    </p>
                    <p className="text-gray-400 text-sm">per night</p>
                  </div>
                </div>

                {/* Room Features */}
                <div className="flex items-center space-x-4 mb-6 text-gray-400 text-sm">
                  <span className="flex items-center">
                    <span className="mr-1">👥</span>
                    {room.type === "double" ? "2 Guests" : "1 Guest"}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">🛏️</span>
                    {room.type === "double" ? "King Bed" : "Single Bed"}
                  </span>
                </div>

                {/* Action Button */}
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
      </div>
    </div>
  );
};

export default User;
