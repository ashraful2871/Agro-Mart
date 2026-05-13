"use client";
import { FaStar } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";

const Service = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const services = [
    { icon: "🌾", title: t("service.organicFarming"), desc: t("service.organicFarmingDesc") },
    { icon: "🚜", title: t("service.modernEquipment"), desc: t("service.modernEquipmentDesc") },
    { icon: "📦", title: t("service.freshDelivery"), desc: t("service.freshDeliveryDesc") },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 pt-20 lg:ml-10">
      <div className="space-y-4 lg:w-1/3 flex flex-col justify-center text-center">
        <h4 className={`${theme === "dark" ? "text-green-600" : "text-green-700"} uppercase font-bold text-lg`}>{t("service.ourServices")}</h4>
        <h3 className="font-bold text-3xl">{t("service.whatWeProvide")}</h3>
        <div className="flex flex-col lg:flex-row space-x-4 items-start mx-auto">
          <div className="w-16 h-16 min-w-[4rem] rounded-full overflow-hidden mx-auto">
            <img src="https://i.ibb.co.com/wZfTrtPz/bedge-of-number-1.jpg" alt="Number 1 badge" className="w-full h-full object-cover" />
          </div>
          <div className="lg:text-left">
            <h4 className="font-bold">{t("service.bestServices")}</h4>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-base`}>{t("service.nationalBestServicesAwards")}</p>
            <p className={`${theme === "dark" ? "text-green-600" : "text-green-700"} font-medium flex items-center gap-1`}>
              <span className="text-yellow-400"><FaStar /></span> {t("service.rating")} 5/5 {t("service.forAgroService")}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition border text-center">
              <span className="text-4xl">{s.icon}</span>
              <h4 className="font-bold text-lg mt-3">{s.title}</h4>
              <p className="text-sm mt-2 text-base-content">{s.desc || "Quality service for your farming needs."}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
