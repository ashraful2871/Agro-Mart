import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaArrowRight } from "react-icons/fa";

// Sample icons 
const NutritionIcon = () => (
  <svg className="w-10 h-10 text-green-700" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 3h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm-2 6H5V3h2zm10 0h2V3h-2z" />
  </svg>
);

const ProductIcon = () => (
  <svg className="w-10 h-10 text-green-700" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const VegetableIcon = () => (
  <svg className="w-10 h-10 text-green-700" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 00-9 5h18a10 10 0 00-9-5zm-9 7v6h18V9zm0 8a10 10 0 009 5 10 10 0 009-5z" />
  </svg>
);

// Services data
const services = [
  {
    id: 1,
    image: "https://i.ibb.co.com/LdpC5RkL/service-1.jpg", 
    icon: <NutritionIcon />,
    title: "Nutrition Solutions",
    description: "We provide sustainable farming solutions tailored to your needs.",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/MyS1WfF7/service-2.jpg", 
    icon: <ProductIcon />,
    title: "Product Supplies",
    description: "High-quality supplies to boost your agricultural productivity.",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/Ld2QPMmY/service-3.jpg", 
    icon: <VegetableIcon />,
    title: "Fresh Vegetables",
    description: "Fresh, organic vegetables straight from the farm to your table.",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/SD1mDg8J/service-4.jpg", 
    icon: <NutritionIcon />,
    title: "Nutrition Solutions",
    description: "We provide sustainable farming solutions tailored to your needs.",
  },
  {
    id: 5,
    image: "https://i.ibb.co.com/b5d8hSdm/service-5.jpg", 
    icon: <ProductIcon />,
    title: "Product Supplies",
    description: "High-quality supplies to boost your agricultural productivity.",
  },
  {
    id: 6,
    image: "https://i.ibb.co.com/DHVKGkwX/service-6.jpg", 
    icon: <VegetableIcon />,
    title: "Fresh Vegetables",
    description: "Fresh, organic vegetables straight from the farm to your table.",
  },
];

const ServiceSlides = () => {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  return (
    <div ref={sliderRef} className="keen-slider font-inter space-x-20">
    {services.map((service) => (
      <div
        key={service.id}
        className="keen-slider__slide min-w-[277.775px] max-w-[277.775px] flex flex-col items-center rounded-xl h-[400px] max-h-screen group"
      >
        {/* Image Section - Fixed height */}
        <div className="relative w-full h-[60%] min-h-[240px] overflow-hidden rounded-t-xl">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-t-xl transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${service.image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-green-200 opacity-30 rounded-t-xl"></div>
        </div>
  
        {/* Card Content */}
        <div className="relative rounded-xl w-full shadow-lg p-6 -mt-16 -mr-20 z-10 bg-white">
          <div
            className="flex flex-col"
            style={{
              backgroundImage: `url("https://i.ibb.co/tpwNCzD8/background-single-post.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <div className="text-green-600">{service.icon}</div>
              <h3 className="text-xl font-bold text-green-700 mt-2 font-montserrat">
                {service.title}
              </h3>
              <div className="w-12 h-1 bg-green-300 my-2"></div>
            </div>
            <p className="text-gray-700 text-base leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>
          <div className="bg-green-700 text-white hover:bg-yellow-400 hover:text-black w-fit py-4 px-4 rounded-b-full absolute top-0 right-10">
            <FaArrowRight />
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default ServiceSlides;