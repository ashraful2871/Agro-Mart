import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import "./slider.css";
import { EffectFade, Autoplay } from "swiper/modules";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.4, duration: 0.6, ease: "easeOut" },
  }),
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: "https://i.ibb.co/7x62M20F/footer-bg-1.png",
      title: ["High Quality Fresh", "Organic Foods"],
      subtitle: "Experience the taste of nature with organic farm products.",
    },
    {
      img: "https://i.ibb.co.com/hR8R8B2s/organic.jpg",
      title: ["Organic Food", "Delivery"],
      subtitle: "We ensure eco-friendly and sustainable agriculture.",
    },
    {
      img: "https://i.ibb.co/jk9hyFT8/environmental-conservation-plant-sustainability.jpg",
      title: ["Eco-Friendly", "Agriculture"],
      subtitle: "Cultivating nature’s best with responsible farming.",
    },
    {
      img: "https://i.ibb.co/xSRR9vkh/senior-hardworking-farmer-agronomist-soybean-field-checking-crops-before-harvest.jpg",
      title: ["Pure Agriculture", "Product"],
      subtitle: "Providing fresh and organic food directly from farms.",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={1000}
      modules={[EffectFade, Autoplay]}
      className="h-[550px] md:h-96 lg:h-[900px] -mt-3"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[600px] zoom-effect slider-image">
            {/* Background Image with Zoom Effect */}
            <motion.img
              src={slide.img}
              alt="slide"
              className="w-full h-full object-cover "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <AnimatePresence mode="sync" key={activeIndex}>
                <div key={index}>
                  {slide.title.map((line, i) => (
                    <motion.h1
                      key={i}
                      custom={i}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-3xl md:text-5xl font-bold font-syne"
                    >
                      {line}
                    </motion.h1>
                  ))}
                </div>

                <motion.p
                  key={`subtitle-${index}`}
                  custom={slide.title.length}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-sm md:text-lg mt-2 font-syne"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  key={`button-${index}`}
                  custom={slide.title.length + 1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-sm mt-4 px-6 py-2 bg-green-800 text-white rounded-full font-syne"
                >
                  Learn More →
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
