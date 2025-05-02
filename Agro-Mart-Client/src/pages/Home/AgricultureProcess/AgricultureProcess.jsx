import React, { useContext } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useTranslation } from "react-i18next";
import LocalizedNumber from "../../../components/LocalizedNumber/LocalizedNumber";

const AgricultureProcess = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const experienceNumber = 5;

  const steps = [
    {
      id: "01",
      title: t("agriculture.scheduleExperience"),
      description: t("agriculture.priorityDescription"),
      icon: "📅",
    },
    {
      id: "02",
      title: t("agriculture.professionalAdvice"),
      description: t("agriculture.priorityDescription"),
      icon: "🛠️",
    },
    {
      id: "03",
      title: t("agriculture.meetExperts"),
      description: t("agriculture.priorityDescription"),
      icon: "👨‍🌾",
    },
    {
      id: "04",
      title: t("agriculture.getBestProducts"),
      description: t("agriculture.priorityDescription"),
      icon: "🛒",
    },
  ];

  return (
    <section className="py-10 md:py-16 lg:py-0">
      <div className="flex flex-col xl:flex-row gap-8 items-center min-h-[100vh]">
        {/* Left Side Image */}
        <div className="xl:w-1/2">
          <img
            src="https://i.ibb.co.com/CgRwKPZ/farmer-2.jpg"
            alt="Agriculture"
            className="w-full h-full object-cover rounded-tr-[200px] md:rounded-tr-[250px] lg:rounded-tr-[300px]"
          />
        </div>

        {/* Right Side Content */}
        <div className="xl:w-1/2 h-full flex items-center">
          <div className="text-center xl:text-left w-full">
            {/* <h1 className="text-3xl font-bold mt-6">{t('welcome')}</h1> */}
            <h3
              className={`${
                theme === "dark" ? "text-green-600" : "text-green-700"
              } font-bold uppercase text-sm`}
            >
              {t("agriculture.workProcess")}
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mt-2">
              {t("agriculture.agricultureProcess")}
            </h2>
            <p className="mt-4 text-base-content text-sm md:text-base">
              {t("agriculture.description")}
            </p>

            {/* Experience Badge */}
            <div className="mt-6 flex items-center justify-center xl:justify-start space-x-4">
              <div className="bg-green-100 p-4 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2906/2906279.png"
                  alt="Farm"
                  className="w-12 h-12"
                />
              </div>
              <div>
                <h3
                  className={`${
                    theme === "dark" ? "text-green-600" : "text-green-700"
                  } text-3xl font-bold`}
                  font-bold
                >
                  {" "}
                  <LocalizedNumber number={experienceNumber} />+{" "}
                </h3>
                <p className="text-base-content">
                  {" "}
                  {t("agriculture.yearsExperience")}
                </p>
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border"
                >
                  <span
                    className={`${
                      theme === "dark" ? "text-green-600" : "text-green-700"
                    } text-base-content text-3xl font-bold`}
                  >
                    {step.id}
                  </span>
                  <h4 className="text-lg font-bold text-base-content mt-2 flex items-center">
                    {step.icon} <span className="ml-2">{step.title}</span>
                  </h4>
                  <p className="text-sm text-base-content mt-1">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgricultureProcess;
