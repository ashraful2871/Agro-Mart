import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./serviceCaer.css";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { ThemeContext } from "../../../../provider/ThemeProvider";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ServiceCard = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const services = [
    {
      id: 1,
      image: "https://i.ibb.co.com/LdpC5RkL/service-1.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 3h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm-2 6H5V3h2zm10 0h2V3h-2z" />
        </svg>
      ),
      title: t('service.nutrition_solutions'),
      description: t('service.nutrition_solutions_desc'),
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/MyS1WfF7/service-2.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      title: t('service.product_supplies'),
      description: t('service.product_supplies_desc'),
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/Ld2QPMmY/service-3.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 00-9 5h18a10 10 0 00-9-5zm-9 7v6h18V9zm0 8a10 10 0 009 5 10 10 0 009-5z" />
        </svg>
      ),
      title: t('service.fresh_vegetables'),
      description: t('service.fresh_vegetables_desc'),
    },
    {
      id: 4,
      image: "https://i.ibb.co.com/LdpC5RkL/service-1.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 3h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm-2 6H5V3h2zm10 0h2V3h-2z" />
        </svg>
      ),
      title: t('service.organic_fruits'),
      description: t('service.organic_fruits_desc'),
    },
    {
      id: 5,
      image: "https://i.ibb.co.com/MyS1WfF7/service-2.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      title: t('service.dairy_products'),
      description: t('service.dairy_products_desc'),
    },
    {
      id: 6,
      image: "https://i.ibb.co.com/Ld2QPMmY/service-3.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 00-9 5h18a10 10 0 00-9-5zm-9 7v6h18V9zm0 8a10 10 0 009 5 10 10 0 009-5z" />
        </svg>
      ),
      title: t('service.poultry_products'),
      description: t('service.poultry_products_desc'),
    },
    {
      id: 7,
      image: "https://i.ibb.co.com/Ld2QPMmY/service-3.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 00-9 5h18a10 10 0 00-9-5zm-9 7v6h18V9zm0 8a10 10 0 009 5 10 10 0 009-5z" />
        </svg>
      ),
      title: t('service.crop_protection'),
      description: t('service.crop_protection_desc'),
    },
    {
      id: 8,
      image: "https://i.ibb.co.com/Ld2QPMmY/service-3.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 00-9 5h18a10 10 0 00-9-5zm-9 7v6h18V9zm0 8a10 10 0 009 5 10 10 0 009-5z" />
        </svg>
      ),
      title: t('service.soil_health_management'),
      description: t('service.soil_health_management_desc'),
    },
    {
      id: 9,
      image: "https://i.ibb.co.com/MyS1WfF7/service-2.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      title: t('service.water_management'),
      description: t('service.water_management_desc'),
    },
    {
      id: 10,
      image: "https://i.ibb.co.com/Ld2QPMmY/service-3.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 00-9 5h18a10 10 0 00-9-5zm-9 7v6h18V9zm0 8a10 10 0 009 5 10 10 0 009-5z" />
        </svg>
      ),
      title: t('service.farm_mechanization'),
      description: t('service.farm_mechanization_desc'),
    },
    {
      id: 11,
      image: "https://i.ibb.co.com/LdpC5RkL/service-1.jpg",
      icon: (
        <svg
          className="w-10 h-10 text-green-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 3h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm0 4h6v2H9zm-2 6H5V3h2zm10 0h2V3h-2z" />
        </svg>
      ),
      title: t('service.weather_based_services'),
      description: t('service.weather_based_services_desc'),
    }
  ];

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {services.map((service, idx) => (
          <SwiperSlide key={idx} className="swiper-slide2">
            <div
              key={service.id}
              className="keen-slider__slide flex flex-col rounded-xl h-[420px] sm:h-[460px] lg:h-[480px] group overflow-visible"
            >
              {/* Image Section */}
              <div className="relative w-full h-[55%] min-h-[200px] sm:min-h-[230px] md:min-h-[250px] overflow-hidden rounded-t-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-green-200 opacity-30"></div>
              </div>

              {/* Card Content */}
              <div className="relative shadow-lg p-5 sm:p-6 md:p-8 bg-base-100 -mt-16 ml-6 sm:ml-10 md:ml-12 rounded-xl">
                <div
                  className="flex flex-col h-full"
                  style={
                    theme === "light"
                      ? {
                          backgroundImage: `url("https://i.ibb.co/tpwNCzD8/background-single-post.png")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                >
                  <div>
                    <div
                      className={`${
                        theme === "dark" ? "text-green-500" : "text-green-700"
                      } text-2xl`}
                    >
                      {service.icon}
                    </div>
                    <h3
                      className={`${
                        theme === "dark" ? "text-green-500" : "text-green-700"
                      } text-lg md:text-xl font-bold mt-2 font-montserrat`}
                    >
                      {service.title}
                    </h3>
                    <div className="w-10 h-[3px] bg-green-300 my-2"></div>
                  </div>
                  <p className="text-base-content text-sm md:text-base leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="bg-green-700 text-base-content hover:bg-yellow-400 hover:text-black w-fit py-3 px-3 rounded-b-full absolute top-0 right-0 transition-colors duration-300">
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ServiceCard;
