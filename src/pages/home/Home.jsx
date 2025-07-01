import React from 'react';

// Sample images - replace these URLs with your actual image paths
const bg1 = "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop";
const bg2 = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop";
const bg3 = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop";
const bg4 = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop";
const bg5 = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop";
const bg6 = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop";
const heroBg = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop";
const secretsBg = "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop";

const Home = () => {
    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <section
                className="w-full h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
                <div className="flex flex-col items-center gap-6 text-center relative z-10 px-4 md:px-0">
                    <h1 className="text-white text-4xl md:text-5xl font-normal drop-shadow-lg leading-tight">
                        One & Only Resorts
                    </h1>
                    <p className="text-white text-lg md:text-2xl font-normal max-w-2xl leading-relaxed drop-shadow-md line-clamp-3">
                        Found in the most fascinating places on the planet, our exceptional one-off resorts set the stage for an extraordinary escape.
                    </p>
                </div>
            </section>

            {/* Those Who Wander Section */}
            <section className="w-full flex items-center justify-center my-8 bg-white dark:bg-gray-900 px-4 md:px-0">
                <div className="flex flex-col w-full max-w-5xl h-auto">
                    <h3 className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-2">
                        <span className="font-semibold text-black dark:text-white">One&Only Resorts</span> {'>'} STORIES
                    </h3>
                    <h1 className="text-2xl md:text-3xl text-center tracking-widest text-black dark:text-white mb-4">
                        THOSE   WHO   WANDER
                    </h1>
                    <p className="text-base md:text-xl text-center max-w-full mx-auto text-gray-800 dark:text-gray-200 line-clamp-3">
                        Lose yourself among ancient city laneways. Find yourself in dramatic mountain landscapes. Dive deep into the world's most fascinating destinations as you delight in exceptional one-off moments that take your breath away.
                    </p>
                </div>
            </section>

            {/* Secrets Section */}
            <section className="w-full flex items-center justify-center bg-white dark:bg-gray-900 px-4 md:px-0">
                <div
                    className="w-full max-w-5xl h-[700px] md:h-[700px] bg-cover bg-no-repeat flex flex-col items-center justify-end gap-6 pb-15 relative rounded-lg overflow-hidden"
                    style={{ backgroundImage: `url(${secretsBg})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
                    <div className="relative z-10 flex flex-col items-center gap-6 px-4 md:px-0">
                        <h1 className="text-2xl md:text-3xl text-white text-center drop-shadow-lg">
                            SECRETS OF ONE&ONLY
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl text-center text-white drop-shadow-md line-clamp-3">
                            Discover the people and details that bring each captivating destination to life, as passionate locals unlock the secrets and stories of our captivating resorts
                        </p>
                        <button className="text-lg md:text-xl w-56 py-2.5 border-2 border-white text-white bg-transparent hover:bg-white hover:text-black dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-300 hover:shadow-lg">
                            EXPLORE
                        </button>
                    </div>
                </div>
            </section>

            {/* Cards Section */}
            <section className="w-full flex items-center justify-center my-12 bg-white dark:bg-gray-900 px-4 md:px-0">
                <div className="w-full max-w-7xl flex flex-wrap justify-between gap-6">
                    {[
                        { img: bg1, title: "BOKA BAY DELIGHTS" },
                        { img: bg4, title: "MOUNTAIN RETREATS" },
                        { img: bg3, title: "OCEAN PARADISE" },
                        { img: bg2, title: "DESERT ESCAPES" },
                        { img: bg5, title: "TROPICAL HAVEN" },
                        { img: bg6, title: "LUXURY GETAWAY" }
                    ].map((card, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-[48%] md:w-[32%] lg:w-[31%] mb-12 group flex flex-col"
                        >
                            <div className="overflow-hidden rounded-lg dark:shadow-2xl flex-shrink-0">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-[300px] md:h-[540px] object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-5 mt-6">
                                <h1 className="text-xl md:text-2xl font-normal text-black dark:text-white truncate w-full" title={card.title}>
                                    {card.title}
                                </h1>
                                <p className="text-sm md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-3">
                                    Discover extraordinary experiences in breathtaking locations. Each destination offers unique adventures and unforgettable moments that will create lasting memories of your journey with us.
                                </p>
                                <button className="text-base md:text-lg px-5 py-2 border-2 border-black dark:border-white text-black dark:text-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:hover:border-gray-200 transition-all duration-300 hover:shadow-lg w-max">
                                    EXPLORE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
