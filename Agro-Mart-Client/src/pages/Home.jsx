import React from "react";
import Slider from "../components/slider/Slider";
import FaqSection from "../components/FaqSection/FaqSection";

const Home = () => {
  return (
    <div>
      <Slider></Slider>

      {/* FAQ Section */}
      <section>
        <FaqSection></FaqSection>
      </section>
    </div>
  );
};

export default Home;
