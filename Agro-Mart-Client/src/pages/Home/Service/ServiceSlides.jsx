import React, { useContext } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaArrowRight } from "react-icons/fa";
import { ThemeContext } from "../../../provider/ThemeProvider";

// Sample icons
const NutritionIcon = () => (
  <svg
    className="w-10 h-10 text-green-700"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M9 3h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm-2 6H5V3h2zm10 0h2V3h-2z" />
  </svg>
);

const ProductIcon = () => (
  <svg
    className="w-10 h-10 text-green-700"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const VegetableIcon = () => (
  <svg
    className="w-10 h-10 text-green-700"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
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
    description:
      "We provide sustainable farming solutions tailored to your needs.",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/MyS1WfF7/service-2.jpg",
    icon: <ProductIcon />,
    title: "Product Supplies",
    description:
      "High-quality supplies to boost your agricultural productivity.",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/Ld2QPMmY/service-3.jpg",
    icon: <VegetableIcon />,
    title: "Fresh Vegetables",
    description:
      "Fresh, organic vegetables straight from the farm to your table.",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/SD1mDg8J/service-4.jpg",
    icon: <NutritionIcon />,
    title: "Nutrition Solutions",
    description:
      "We provide sustainable farming solutions tailored to your needs.",
  },
  {
    id: 5,
    image: "https://i.ibb.co.com/b5d8hSdm/service-5.jpg",
    icon: <ProductIcon />,
    title: "Product Supplies",
    description:
      "High-quality supplies to boost your agricultural productivity.",
  },
  {
    id: 6,
    image: "https://i.ibb.co.com/DHVKGkwX/service-6.jpg",
    icon: <VegetableIcon />,
    title: "Fresh Vegetables",
    description:
      "Fresh, organic vegetables straight from the farm to your table.",
  },
];

const ServiceSlides = () => {
  const { theme } = useContext(ThemeContext);
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 30 },
      },
    },
    slides: { perView: 1, spacing: 20 },
  });

  return (
    <div ref={sliderRef} className="keen-slider font-inter">
      {services.map((service) => (
        <div
          key={service.id}
          className="keen-slider__slide min-w-[320px] max-w-[320px] flex flex-col rounded-xl h-[420px] group overflow-visible"
        >
          {/* Image Section */}
          <div className="relative w-full h-[55%] min-h-[220px] overflow-hidden rounded-t-xl">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${service.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-green-200 opacity-30"></div>
          </div>

          {/* Card Content - Adjusted for ml-20 */}
          <div className="relative w-[calc(100%-5rem)] shadow-lg p-6 bg-base-100 -mt-16 ml-20 rounded-xl">
            <div
              className="flex flex-col h-full"
              style={
                theme === "light"
                  ? {
                      backgroundImage: `url("https://i.ibb.co/tpwNCzD8/background-single-post.png")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              <div>
                <div className="text-green-600">{service.icon}</div>
                <h3 className="text-xl font-bold text-green-600 mt-2 font-montserrat">
                  {service.title}
                </h3>
                <div className="w-12 h-1 bg-green-300 my-2"></div>
              </div>
              <p className="text-base-content text-base leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </div>
            <div className="bg-green-700 text-base-content hover:bg-yellow-400 hover:text-black w-fit py-4 px-4 rounded-b-full absolute top-0 right-0 transition-colors duration-300">
              <FaArrowRight />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSlides;
