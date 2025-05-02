import React from "react";
import Slider from "../components/slider/Slider";
import FaqSection from "../components/FaqSection/FaqSection";
import ReviewPosting from "../components/ReviewPosting/ReviewPosting";
import ReviewDisplay from "../components/ReviewDisplay/ReviewDisplay";
import WhyChooseUs from "./Home/WhyChooseUs/WhyChooseUs";
import ParallaxSection from "./Home/ParallaxSection/ParallaxSection";
import AgricultureProcess from "./Home/AgricultureProcess/AgricultureProcess";
import Service from "./Home/Service/Service";
import WeatherCard from "./Weather/WeatherCard";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import CurrencySelector from "../components/CurrencySelector/CurrencySelector";

const Home = () => {
  return (
    <div className="space-y-7 ">
      {/* Slider and Weather Section */}
      <div className="relative">
        {/* slider div */}
        <div>
          <Slider></Slider>
        </div>

        <div>
          <LanguageSwitcher></LanguageSwitcher>
        </div>
        <div>
          <CurrencySelector></CurrencySelector>
        </div>

        {/* weather div */}
        <div className="absolute top-20 left-0 p-4 z-10">
          {/* <h1 className="text-2xl font-bold">Agro Mart 🧑‍🌾</h1> */}
          <WeatherCard />
        </div>
      </div>

      <div className="p-2">
        {/* Agriculture Progress */}
        <div className="">
          <AgricultureProcess></AgricultureProcess>
        </div>

        {/* Our Services section */}
        <div>
          <Service></Service>
        </div>

        {/* FAQ Section */}
        <div className="max-w-screen-xl mx-auto p-2">
          <FaqSection></FaqSection>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-screen-xl mx-auto p-2">
          <WhyChooseUs></WhyChooseUs>
        </div>

        {/* Parallax Section */}
        <ParallaxSection></ParallaxSection>

        {/* Review Display */}
        <div>
          <ReviewDisplay></ReviewDisplay>
        </div>
      </div>
      {/* Review Posting Section  */}
      <section>
        <ReviewPosting></ReviewPosting>
        {/* <Review></Review> */}
      </section>
    </div>
  );
};

export default Home;
