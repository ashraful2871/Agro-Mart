import { useContext } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useTranslation } from "react-i18next";

const AboutAgro = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div>
      <div
        className={`${
          theme === "dark" ? "bg-[#1F2937]" : "bg-white"
        } py-16 flex flex-col lg:flex-row justify-between`}
      >
        <div className="flex justify-center items-center">
          <img
            src="https://i.ibb.co.com/gZGgsyDv/freepik-background-12695.png"
            alt=""
          />
        </div>
        <div className="max-w-full lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="">
            <h1 className="text-4xl font-bold text-green-700">
              {" "}
              {t("aboutAgro.title")}{" "}
            </h1>
            <p className="mt-4 text-5xl font-bold text-base-content">
              {t("aboutAgro.subtitle")}
            </p>
          </div>

          {/* Introduction */}
          <p className="mt-8 text-lg text-base-content ">
            {t("aboutAgro.description")}
          </p>

          {/* Agriculture & Foods Section */}
          <div className="mt-12 flex flex-col md:flex-row justify-between gap-8">
            <div
              className={`${
                theme === "dark" ? "bg-[#1F2937]" : "bg-white"
              } p-6 rounded-lg shadow-md flex-1`}
            >
              <h2 className="text-2xl font-semibold text-green-700">
                {t("aboutAgro.agriculture")}
              </h2>
              <p className="mt-2 text-base-content">
                {t("aboutAgro.agriculture_desc")}
              </p>
            </div>

            {/* Vegetables & Fruits Section */}
            <div
              className={`${
                theme === "dark" ? "bg-[#1F2937]" : "bg-white"
              } p-6 rounded-lg shadow-md flex-1`}
            >
              <h2 className="text-2xl font-semibold text-green-700">
                {t("aboutAgro.Vegetables")}
              </h2>
              <p className="mt-2 text-base-content">
                {t("aboutAgro.vegetables_desc")}
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <p className="mt-12 text-lg text-base-content ">
            {t("aboutAgro.mission")}
          </p>

          {/* Footer Section */}
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-base-content">{t("aboutAgro.sign")} </p>
            <button className="hidden bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
              {t("aboutAgro.exploreMore")} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAgro;
