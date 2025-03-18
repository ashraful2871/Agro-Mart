import React from "react";
import Slider from "../components/slider/Slider";
import FaqSection from "../components/FaqSection/FaqSection";

const Home = () => {
  return (
    <div className="space-y-7">
      <Slider></Slider>

      {/* FAQ Section */}
      <section className="max-w-screen-xl mx-auto mt-5 p-2">
        <FaqSection></FaqSection>
      </section>
    </div>
  );
};

export default Home;
