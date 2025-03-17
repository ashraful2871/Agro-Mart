import React from "react";
import Slider from "../components/slider/Slider";
import FaqSection from "../components/FaqSection/FaqSection";

const Home = () => {
  return (
    <div className="space-y-7">
      <Slider></Slider>

      {/* FAQ Section */}
      <section>
        <FaqSection></FaqSection>
      </section>
    </div>
  );
};

export default Home;
