import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy data - Home səhifəsindəki ilə eyni olmalıdır
const cards = [
  { id: '1', img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop", title: "BOKA BAY DELIGHTS" },
  { id: '2', img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop", title: "MOUNTAIN RETREATS" },
  { id: '3', img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", title: "OCEAN PARADISE" },
  { id: '4', img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", title: "DESERT ESCAPES" },
  { id: '5', img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop", title: "TROPICAL HAVEN" },
  { id: '6', img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", title: "LUXURY GETAWAY" },
];

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = cards.find((c) => c.id === id);

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
        <h2 className="text-2xl">Data not found 😕</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm px-4 py-2 border border-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          ← Back
        </button>

        <img src={card.img} alt={card.title} className="w-full h-96 object-cover rounded-lg shadow-md mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">{card.title}</h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Welcome to <strong>{card.title}</strong>. This destination offers an unforgettable experience with its breathtaking scenery, luxurious accommodations, and once-in-a-lifetime adventures.
        </p>
      </div>
    </div>
  );
};

export default DetailPage;
