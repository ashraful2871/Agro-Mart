import React, { useContext } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { IoMdCheckmark } from "react-icons/io";

const WhyChooseUs = () => {
    const { theme } = useContext(ThemeContext);
  
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-8 bg-base-50 mb-20">
      <div className="space-y-6 max-w-xl">
        <h4 className= {`${theme === "dark" ? "text-green-600" : "text-green-700"} uppercase text-sm font-bold tracking-wide`}>
          Why Choose Us
        </h4>
        <h2 className="font-syne text-4xl font-bold text-base-content">
          We Are Different From Other Farming
        </h2>
        <p className="text-base-content">
          Our farming methods are sustainable, eco-friendly, and designed to
          deliver the highest quality produce. We prioritize nature and health
          in everything we do.
        </p>
        <div className="space-y-6">
          <div className="flex md:space-x-4">
            <div className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-green-700 text-2xl hidden md:block`}>🌱</div>
            <div>
              <h3 className="font-bold text-xl text-base-content">
                Sustainable Practices
              </h3>
              <p className="text-base-content">
                We use eco-friendly techniques to ensure the land remains
                fertile for future generations.
              </p>
            </div>
          </div>
          <div className="flex md:space-x-4">
            <div className={`${theme === "dark" ? "text-green-600" : "text-green-700"}text-2xl hidden md:block`}>🍃</div>
            <div>
              <h3 className="font-bold text-xl text-base-content">
                Organic Certification
              </h3>
              <p className="text-base-content">
                All our products are certified organic, free from harmful
                chemicals and pesticides.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content">100% Natural</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content">Locally Sourced</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content">Eco-Friendly</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content">Fresh & Healthy</p>
          </div>
        </div>
      </div>
      <div className="max-w-md relative mt-4 lg:mt-0 flex flex-col items-center justify-center">
        <img
          src="https://i.ibb.co/1Yz6gN2g/raspberries-2023404-1280.jpg"
          alt="Farming Illustration"
          className="rounded-lg shadow-lg w-full"
        />

        <div className="hidden lg:block absolute -bottom-28 -left-28">
          <img
            src="https://i.ibb.co/xtJfP48V/pumpkin-1768857-1280.jpg"
            alt="Farming Illustration"
            className="rounded-lg shadow-lg w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
