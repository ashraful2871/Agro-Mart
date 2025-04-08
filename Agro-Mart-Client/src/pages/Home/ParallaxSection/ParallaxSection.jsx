import React from 'react';

const ParallaxSection = () => {
    return (
        <div className="relative pt-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-300"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/SX9QF6DM/parallax-img.jpg')",
        }}
      ></div>

      {/* Foreground Elements */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center py-20 lg:py-52 px-4">
        <h3 className="text-sm tracking-wider uppercase z-10">
          What Makes Us Special?
        </h3>
        <h1 className="text-5xl md:text-6xl font-bold mt-2 z-10">
          Agriculture & Eco Farming
        </h1>
        <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition z-10">
          Discover More →
        </button>

        {/* Farmer Image */}
        <img
          src="https://i.ibb.co.com/FkF6C2DV/farmer.png"
          alt="Farmer"
          className="absolute bottom-0 left-10 w-64 md:w-[600px] transition-transform duration-300 hidden lg:block"
        />

      </div>
    </div>
    );
};

export default ParallaxSection;