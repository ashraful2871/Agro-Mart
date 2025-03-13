import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import "./slider.css";

import { EffectFade, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={1000}
      modules={[EffectFade, Autoplay]}
      className="mySwiper rounded-xl"
    >
      {[
        {
          img: "https://i.ibb.co/7x62M20F/footer-bg-1.png",
          title: (
            <h1>
              High Quality Fresh <br /> Organic Foods
            </h1>
          ),
          subtitle:
            "Experience the taste of nature with organic farm products.",
        },
        {
          img: "https://i.ibb.co.com/hR8R8B2s/organic.jpg",
          title: <h1>organic food Delivery</h1>,
          subtitle: "We ensure eco-friendly and sustainable agriculture.",
        },
        {
          img: "https://i.ibb.co/jk9hyFT8/environmental-conservation-plant-sustainability.jpg",
          title: <h1>Eco-Friendly Agriculture</h1>,
          subtitle: "Cultivating nature’s best with responsible farming.",
        },
        {
          img: "https://i.ibb.co/xSRR9vkh/senior-hardworking-farmer-agronomist-soybean-field-checking-crops-before-harvest.jpg",
          title: (
            <h1>
              Pure Agriculture <br /> Product
            </h1>
          ),
          subtitle: "Providing fresh and organic food directly from farms.",
        },
      ].map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[600px] zoom-effect">
            {/* Background Image */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <h1 className="text-5xl font-bold font-syne">{slide.title}</h1>
              <p className="text-lg mt-2">{slide.subtitle}</p>
              <button className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold">
                Learn More →
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
