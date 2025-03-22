import React from "react";
import Slider from "../components/slider/Slider";
import FaqSection from "../components/FaqSection/FaqSection";
import ReviewPosting from "../components/ReviewPosting/ReviewPosting";
import ReviewDisplay from "../components/ReviewDisplay/ReviewDisplay";
import WhyChooseUs from "./Home/WhyChooseUs/WhyChooseUs";
import ParallaxSection from "./Home/ParallaxSection/ParallaxSection";

const Home = () => {
  return (
    <div className="space-y-7">
      <Slider></Slider>

      {/* FAQ Section */}
      <section className="max-w-screen-xl mx-auto mt-5 p-2">
        <FaqSection></FaqSection>
      </section>

      {/* Review Posting Section */}
      {/* <section>
        <ReviewPosting></ReviewPosting>
      </section> */}

      {/* Why Choose Us */}
      <section>
        <WhyChooseUs></WhyChooseUs>
      </section>

      {/* Parallax Section */}
      <ParallaxSection></ParallaxSection>

      {/* Review Display */}
      <section>
        <ReviewDisplay></ReviewDisplay>
      </section>
    </div>
  );
};

export default Home;
