import React from "react";
import { useTranslation } from "react-i18next";

const ImageText = () => {
  const {t} = useTranslation();

  return (
    <div
      style={{
        fontWeight: "bold",
        backgroundImage: "url('https://i.ibb.co.com/QjXtsqpC/farm-land.jpg')",
        backgroundSize: "cover",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        textAlign: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p className="font-syne text-5xl md:text-7xl xl:text-9xl my-10">
        {t('aboutUs.projectName')}
      </p>
    </div>
  );
};

export default ImageText;
