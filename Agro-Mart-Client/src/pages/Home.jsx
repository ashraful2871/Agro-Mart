import React from "react";
import Slider from "../components/slider/Slider";
import FaqSection from "../components/FaqSection/FaqSection";
import ReviewPosting from "../components/ReviewPosting/ReviewPosting";
import ReviewDisplay from "../components/ReviewDisplay/ReviewDisplay";

const Home = () => {
  return (
    <div className="space-y-7">
      <Slider></Slider>

      {/* FAQ Section */}
      <section className="max-w-screen-xl mx-auto mt-5 p-2">
        <FaqSection></FaqSection>
      </section>
      {/* Review Posting Section */}
      <section>
        <ReviewPosting></ReviewPosting>
      </section>
      {/* Review Display */}
      <section>
        <ReviewDisplay></ReviewDisplay>
      </section>
    </div>
  );
};

export default Home;
