import React from 'react';
import { Link } from 'react-router-dom';

const cardData = [
  { id: '1', img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop", title: "BOKA BAY DELIGHTS" },
  { id: '2', img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop", title: "MOUNTAIN RETREATS" },
  { id: '3', img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", title: "OCEAN PARADISE" },
  { id: '4', img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", title: "DESERT ESCAPES" },
  { id: '5', img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop", title: "TROPICAL HAVEN" },
  { id: '6', img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", title: "LUXURY GETAWAY" },
];

const heroBg = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop";
const secretsBg = "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop";

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Hero Section */}
      <section
        className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
            One & Only Resorts
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-2xl mt-4 mx-auto drop-shadow-md line-clamp-3">
            Found in the most fascinating places on the planet, our exceptional one-off resorts set the stage for an extraordinary escape.
          </p>
        </div>
      </section>

      {/* Those Who Wander Section */}
      <section className="my-12 px-4 md:px-0 text-center max-w-5xl mx-auto">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-2">
          <span className="font-semibold text-black dark:text-white">One&Only Resorts</span> {'>'} STORIES
        </h3>
        <h1 className="text-2xl md:text-3xl text-black dark:text-white tracking-widest mb-4">
          THOSE WHO WANDER
        </h1>
        <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 line-clamp-3">
          Lose yourself among ancient city laneways. Find yourself in dramatic mountain landscapes.
          Dive deep into the world's most fascinating destinations as you delight in exceptional one-off moments that take your breath away.
        </p>
      </section>

      {/* Secrets Section */}
      <section className="w-full flex justify-center bg-white dark:bg-gray-900 px-4 md:px-0">
        <div
          className="w-full max-w-5xl h-[600px] md:h-[700px] bg-cover bg-no-repeat flex flex-col items-center justify-end gap-6 pb-12 relative rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${secretsBg})` }}
        >
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-2xl md:text-3xl text-white font-bold drop-shadow-lg">SECRETS OF ONE&ONLY</h1>
            <p className="text-lg md:text-xl text-white mt-4 drop-shadow-md line-clamp-3">
              Discover the people and details that bring each captivating destination to life.
              Passionate locals unlock the secrets and stories of our captivating resorts.
            </p>
            <button className="mt-4 px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black dark:hover:bg-gray-100 dark:hover:text-gray-900 transition">
              EXPLORE
            </button>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="my-12 px-4 md:px-0 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-6">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="w-full sm:w-[48%] md:w-[32%] lg:w-[30%] group"
            >
              <div className="overflow-hidden rounded-lg shadow-lg dark:shadow-2xl">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-[280px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <h2 className="text-xl md:text-2xl text-black dark:text-white truncate" title={card.title}>
                  {card.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base line-clamp-3">
                  Discover extraordinary experiences in breathtaking locations. Each destination offers unique adventures and unforgettable moments.
                </p>
                <Link to={`/detail/${card.id}`}>
                  <button className="text-sm md:text-base px-5 py-2 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
                    EXPLORE
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
