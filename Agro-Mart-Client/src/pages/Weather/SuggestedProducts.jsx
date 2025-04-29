import React from "react";
import { useTranslation } from "react-i18next";

const getProductSuggestions = (weatherMain, t) => {
  const images = {
    rain: [
      "https://i.ibb.co.com/bgvKd6Gk/Tomato-2212111114.jpg",
      "https://i.ibb.co.com/bMYqwKBW/bag.png",
      "https://i.ibb.co.com/KxRwP2XN/fungiside.jpg",
    ],
    clear: [
      "https://i.ibb.co.com/qMhzgGrZ/hat.webp",
      "https://i.ibb.co.com/WNZdjkLN/solar-water-pump-for-irrigation.jpg",
      "https://i.ibb.co.com/2YZYvb1P/what-is-a-Soil-Sensor.jpg",
    ],
    clouds: [
      "https://i.ibb.co.com/MxYdshg5/compost.jpg",
      "https://i.ibb.co.com/7xQn74RH/Electrical-LED-Grow-Light.jpg",
    ],
    default: [
      "https://i.ibb.co.com/HTTZhD05/sar.jpg",
      "https://i.ibb.co.com/rRTgLW7S/krishi-646863c2869d9.jpg",
    ],
  };

  // Normalize weatherKey to lowercase to match JSON keys
  const weatherKey = (weatherMain || "default").toLowerCase();

  // Fetch suggestions with returnObjects: true
  const suggestions = t(
    `dashboard.seller.weather-suggestion.suggested_products.products.${weatherKey}`,
    { returnObjects: true }
  );

  // Check if suggestions is an array; if not, return an empty array or fallback
  if (!Array.isArray(suggestions)) {
    console.error(
      `Translation for ${weatherKey} is not an array:`,
      suggestions
    );
    return []; // Fallback to empty array to prevent map error
  }

  // Map suggestions to include images
  return suggestions.map((product, index) => ({
    name: product.name,
    image: images[weatherKey][index] || "https://i.ibb.co.com/HTTZhD05/sar.jpg", // Fallback image
  }));
};

const SuggestedProducts = ({ weatherType }) => {
  const { t } = useTranslation();
  const suggestions = getProductSuggestions(weatherType, t);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-7 text-center">
        {t("dashboard.seller.weather-suggestion.suggested_products.title")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.length > 0 ? (
          suggestions.map((product, idx) => (
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
              <div className="p-3 text-center font-semibold">
                {product.name}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {t(
              "dashboard.seller.weather-suggestion.suggested_products.no_products",
              {
                defaultValue:
                  "No products available for this weather condition.",
              }
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default SuggestedProducts;
