import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./serviceCaer.css";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { ThemeContext } from "../../../../provider/ThemeProvider";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ProductsCard from "../../../Shop/ProductsCard";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/loading/Loading";

const ServiceCard = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();
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
      title: t("service.nutrition_solutions"),
      description: t("service.nutrition_solutions_desc"),
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
      title: t("service.product_supplies"),
      description: t("service.product_supplies_desc"),
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
      title: t("service.fresh_vegetables"),
      description: t("service.fresh_vegetables_desc"),
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
      title: t("service.organic_fruits"),
      description: t("service.organic_fruits_desc"),
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
      title: t("service.dairy_products"),
      description: t("service.dairy_products_desc"),
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
      title: t("service.poultry_products"),
      description: t("service.poultry_products_desc"),
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
      title: t("service.crop_protection"),
      description: t("service.crop_protection_desc"),
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
      title: t("service.soil_health_management"),
      description: t("service.soil_health_management_desc"),
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
      title: t("service.water_management"),
      description: t("service.water_management_desc"),
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
      title: t("service.farm_mechanization"),
      description: t("service.farm_mechanization_desc"),
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
      title: t("service.weather_based_services"),
      description: t("service.weather_based_services_desc"),
    },
  ];

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["feature-product"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/feature-product");
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(products);

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
        {products.map((product, idx) => (
          <SwiperSlide key={idx} className="swiper-slide2">
            <ProductsCard product={product}></ProductsCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ServiceCard;
