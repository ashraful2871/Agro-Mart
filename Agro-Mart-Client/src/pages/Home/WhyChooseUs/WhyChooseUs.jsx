import React, { useContext } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { IoMdCheckmark } from "react-icons/io";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
    const { theme } = useContext(ThemeContext);
    const {t} = useTranslation();
  
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-8 bg-base-50 mb-20">
      <div className="space-y-6 max-w-xl">
        <h4 className= {`${theme === "dark" ? "text-green-600" : "text-green-700"} uppercase text-sm font-bold tracking-wide`}>
          {t('whyChooseUs.title')}
        </h4>
        <h2 className="font-syne text-4xl font-bold text-base-content">
          {t('whyChooseUs.subtitle')}
        </h2>
        <p className="text-base-content">
          {t('whyChooseUs.description')}
        </p>
        <div className="space-y-6">
          <div className="flex md:space-x-4">
            <div className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-green-700 text-2xl hidden md:block`}>🌱</div>
            <div>
              <h3 className="font-bold text-xl text-base-content">
                {t('whyChooseUs.sustainablePractices')}
              </h3>
              <p className="text-base-content">
                {t('whyChooseUs.sustainablePracticesDesc')}
              </p>
            </div>
          </div>
          <div className="flex md:space-x-4">
            <div className={`${theme === "dark" ? "text-green-600" : "text-green-700"}text-2xl hidden md:block`}>🍃</div>
            <div>
              <h3 className="font-bold text-xl text-base-content">
                {t('whyChooseUs.organicCertification')}
              </h3>
              <p className="text-base-content">
                {t('whyChooseUs.organicCertificationDesc')}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content"> {t('whyChooseUs.checkmarks.natural')} </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content"> {t('whyChooseUs.checkmarks.locallySourced')} </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content"> {t('whyChooseUs.checkmarks.ecoFriendly')} </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${theme === "dark" ? "text-green-600" : "text-green-700"} text-xl font-bold`}><IoMdCheckmark /></span>
            <p className="text-base-content"> {t('whyChooseUs.checkmarks.freshHealthy')} </p>
          </div>
        </div>
      </div>
      <div className="max-w-md relative mt-4 lg:mt-0 flex flex-col items-center justify-center">
        <img
          src="https://i.ibb.co/1Yz6gN2g/raspberries-2023404-1280.jpg"
          alt="Farming Illustration"
          className="rounded-lg shadow-lg w-full"
        />

        <div className="hidden lg:block absolute -bottom-28 -left-28">
          <img
            src="https://i.ibb.co/xtJfP48V/pumpkin-1768857-1280.jpg"
            alt="Farming Illustration"
            className="rounded-lg shadow-lg w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
