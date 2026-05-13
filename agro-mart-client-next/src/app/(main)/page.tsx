"use client";
import Slider from "@/components/home/Slider";
import AgricultureProcess from "@/components/home/AgricultureProcess";
import Service from "@/components/home/Service";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ParallaxSection from "@/components/home/ParallaxSection";
import FaqSection from "@/components/home/FaqSection";
import ReviewDisplay from "@/components/reviews/ReviewDisplay";
import ReviewPosting from "@/components/reviews/ReviewPosting";

export default function HomePage() {
  return (
    <div>
      <div className="-mt-16">
        <Slider />
      </div>
      <div className="w-11/12 mx-auto">
        <AgricultureProcess />
        <Service />
      </div>
      <ParallaxSection />
      <div className="w-11/12 mx-auto">
        <WhyChooseUs />
        <FaqSection />
        <ReviewDisplay />
        <ReviewPosting />
      </div>
    </div>
  );
}
