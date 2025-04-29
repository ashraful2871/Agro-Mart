import React from "react";
import { useTranslation } from "react-i18next";

const WeatherAdviceCard = ({ weatherType, temp }) => {
  const { t } = useTranslation();

  let adviceKey = "default";
  if (temp >= 35) {
    adviceKey = "hot";
  } else if (weatherType === "Rain") {
    adviceKey = "rain";
  } else if (weatherType === "Clear") {
    adviceKey = "clear";
  } else if (weatherType === "Thunderstorm") {
    adviceKey = "thunderstorm";
  }

  return (
    <div className="mt-4 p-4 bg-green-100/60 backdrop-blur-md rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2">
        {t("dashboard.seller.weather-suggestion.weather_advice_card.title")}
      </h3>
      <p>
        {t(
          `dashboard.seller.weather-suggestion.weather_advice_card.advice.${adviceKey}`
        )}
      </p>
    </div>
  );
};

export default WeatherAdviceCard;
