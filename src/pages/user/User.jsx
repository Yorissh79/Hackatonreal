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
    <section className="rooms p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Hotel Rooms
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-6 border-b border-gray-300">
                Room Number
              </th>
              <th className="text-left py-3 px-6 border-b border-gray-300">
                Type
              </th>
              <th className="text-left py-3 px-6 border-b border-gray-300">
                Status
              </th>
              <th className="text-left py-3 px-6 border-b border-gray-300">
                Price ($)
              </th>
              <th className="text-center py-3 px-6 border-b border-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 border-b border-gray-300 font-medium">
                  {room.number}
                </td>
                <td className="py-4 px-6 border-b border-gray-300 capitalize">
                  {room.type}
                </td>
                <td
                  className={`py-4 px-6 border-b border-gray-300 capitalize font-semibold ${
                    room.status === "available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {room.status}
                </td>
                <td className="py-4 px-6 border-b border-gray-300">
                  ${room.price}
                </td>
                <td className="py-4 px-6 border-b border-gray-300 text-center">
                  <button
                    onClick={() => handleBooking(room.number)}
                    disabled={room.status !== "available"}
                    className={`px-4 py-2 rounded-md font-medium transition 
                      ${
                        room.status === "available"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Book Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default User;
