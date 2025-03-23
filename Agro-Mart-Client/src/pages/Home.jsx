import React from "react";
import Slider from "../components/slider/Slider";
import FaqSection from "../components/FaqSection/FaqSection";
import ReviewPosting from "../components/ReviewPosting/ReviewPosting";
import ReviewDisplay from "../components/ReviewDisplay/ReviewDisplay";
import WhyChooseUs from "./Home/WhyChooseUs/WhyChooseUs";
import ParallaxSection from "./Home/ParallaxSection/ParallaxSection";
import AgricultureProcess from "./Home/AgricultureProcess/AgricultureProcess";

const Home = () => {
  return (
    <div className="space-y-7">
      <Slider></Slider>

      {/* Agriculture Progress */}
      <div className="">
        <AgricultureProcess></AgricultureProcess>
      </div>

      {/* FAQ Section */}
      <div className="max-w-screen-xl mx-auto p-2">
        <FaqSection></FaqSection>
      </div>

      {/* Review Posting Section */}
      {/* <section>
        <ReviewPosting></ReviewPosting>
      </section> */}

      {/* Why Choose Us */}
      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>

      {/* Parallax Section */}
      <ParallaxSection></ParallaxSection>

      {/* Review Display */}
      <div>
        <ReviewDisplay></ReviewDisplay>
      </div>
    </div>
  );
};

export default Home;
