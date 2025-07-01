import React from "react";

const User = () => {
  const rooms = [
    { id: 1, number: 101, type: "double", status: "available", price: 120 },
    { id: 2, number: 102, type: "single", status: "occupied", price: 80 },
    { id: 3, number: 103, type: "double", status: "available", price: 150 },
    { id: 4, number: 104, type: "single", status: "occupied", price: 90 },
    { id: 5, number: 105, type: "double", status: "available", price: 130 },
  ];

  return (
    <section className="rooms p-6">
      <h2 className="text-2xl font-semibold mb-4">Hotel Rooms</h2>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 border-b border-gray-300">
              Room Number
            </th>
            <th className="text-left py-3 px-4 border-b border-gray-300">
              Type
            </th>
            <th className="text-left py-3 px-4 border-b border-gray-300">
              Status
            </th>
            <th className="text-left py-3 px-4 border-b border-gray-300">
              Price ($)
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b border-gray-300">
                {room.number}
              </td>
              <td className="py-3 px-4 border-b border-gray-300 capitalize">
                {room.type}
              </td>
              <td
                className={`py-3 px-4 border-b border-gray-300 capitalize ${
                  room.status === "available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {room.status}
              </td>
              <td className="py-3 px-4 border-b border-gray-300">
                ${room.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default User;
