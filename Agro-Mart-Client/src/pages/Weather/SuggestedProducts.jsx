import React from "react";

const getProductSuggestions = (weatherMain) => {
  switch (weatherMain) {
    case "Rain":
      return [
        { name: "বৃষ্টির ছাউনি", image: "https://i.ibb.co.com/bgvKd6Gk/Tomato-2212111114.jpg" },
        { name: "ওয়াটারপ্রুফ সিড ব্যাগ", image: "https://i.ibb.co.com/bMYqwKBW/bag.png" },
        { name: "ফাঙ্গিসাইড", image: "https://i.ibb.co.com/KxRwP2XN/fungiside.jpg" },
      ];
    case "Clear":
      return [
        { name: "সান হ্যাট", image: "https://i.ibb.co.com/qMhzgGrZ/hat.webp" },
        { name: "জল সেচ কিট", image: "https://i.ibb.co.com/WNZdjkLN/solar-water-pump-for-irrigation.jpg" },
        { name: "মাটি আর্দ্রতা সেন্সর", image: "https://i.ibb.co.com/2YZYvb1P/what-is-a-Soil-Sensor.jpg" },
      ];
    case "Clouds":
      return [
        { name: "কম্পোস্ট সার", image: "https://i.ibb.co.com/MxYdshg5/compost.jpg" },
        { name: "LED গ্রো লাইট", image: "https://i.ibb.co.com/7xQn74RH/Electrical-LED-Grow-Light.jpg" },
      ];
    default:
      return [
        { name: "জৈব সার", image: "https://i.ibb.co.com/HTTZhD05/sar.jpg" },
        { name: "সাধারণ কৃষি সরঞ্জাম", image: "https://i.ibb.co.com/rRTgLW7S/krishi-646863c2869d9.jpg" },
      ];
  }
};

const SuggestedProducts = ({ weatherType }) => {
  const suggestions = getProductSuggestions(weatherType);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-7 text-center">
        বর্তমান আবহাওয়ার জন্য প্রস্তাবিত পণ্য
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((product, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-md rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
           <div className="h-56 overflow-hidden">
           <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
           </div>
            <div className="p-3 text-center font-semibold">{product.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
