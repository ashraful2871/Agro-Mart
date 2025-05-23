import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "./slider.css";
import { EffectFade, Autoplay } from "swiper/modules";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useTranslation } from "react-i18next";


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
  const { t } = useTranslation();

  const slides = [
    // {
    //   img: "https://i.ibb.co.com/x8Jfj1vp/Eid-banner.jpg",
    //   title: [t("slider.celebrateEid"), t("slider.freshOrganicProduce")],
    //   subtitle: t("slider.experienceJoy"),
    //   isEid: true,
    // },
    // {
    //   img: "https://i.ibb.co.com/tpWhv3JY/eid-banner-2.jpg",
    //   type: "timer",
    //   timerDate: "2025-04-20T00:00:00",
    // },
    {
      img: "https://i.ibb.co/7x62M20F/footer-bg-1.png",
      title: [t("slider.highQuality"), t("slider.organicFoods")],
      subtitle: t("slider.experienceTaste"),
    },
    {
      img: "https://i.ibb.co.com/hR8R8B2s/organic.jpg",
      title: [t("slider.organicFood"), t("slider.delivery")],
      subtitle: t("slider.ecoFriendlySustainable"),
    },
    {
      img: "https://i.ibb.co/jk9hyFT8/environmental-conservation-plant-sustainability.jpg",
      title: [t("slider.ecoFriendly"), t("slider.agriculture")],
      subtitle: t("slider.cultivatingBest"),
    },
    {
      img: "https://i.ibb.co/xSRR9vkh/senior-hardworking-farmer-agronomist-soybean-field-checking-crops-before-harvest.jpg",
      title: [t("slider.pureAgriculture"), t("slider.product")],
      subtitle: t("slider.freshDirectFarm"),
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={1000}
      modules={[EffectFade, Autoplay]}
      className="h-[550px] md:h-96 lg:h-[770px]"
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className={`relative w-full h-[600px] ${
              slide.type !== "timer" ? "zoom-effect" : ""
            } slider-image`}
          >
            {/* Background Image */}
            <img
              src={slide.img}
              alt="slide"
              className="w-full h-full object-cover"
            />

            {/* Eid Pattern Overlay (only for Eid slide) */}
            {slide.isEid && (
              <div className="absolute inset-0 bg-eid-pattern opacity-20"></div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              {slide.type === "timer" ? (
                <div>
                  <h1 className="text-5xl font-bold">{t("slider.eidHotSales")}</h1>
                  <div className="text-7xl mt-4">
                    <CountdownTimer targetDate={slide.timerDate} />
                  </div>
                </div>
              ) : (
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

                  <Link to="/about">
                    {" "}
                    <motion.button
                      key={`button-${index}`}
                      custom={slide.title.length + 1}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-4 px-6 py-2 bg-green-800 text-white rounded-full font-syne flex items-center gap-1"
                    >
                      <span className="text-base">{t("slider.learnMore")}</span>{" "}
                      <span>
                        <ArrowForwardOutlinedIcon fontSize="medium" />
                      </span>
                    </motion.button>
                  </Link>
                </AnimatePresence>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
