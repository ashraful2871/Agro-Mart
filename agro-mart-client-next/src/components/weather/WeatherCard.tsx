"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGeolocation from "@/hooks/useGeolocation";
import { requestNotificationPermission } from "@/lib/utils";

const WeatherCard = ({ onWeatherTypeChange, setWeather }: { onWeatherTypeChange?: (type: string) => void; setWeather?: (data: any) => void }) => {
  const { t, i18n } = useTranslation();
  const location = useGeolocation();
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    if (location) {
      const { lat, lon } = location;
      const lang = i18n.language === "bn" ? "bn" : "en";
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY || ""}&units=metric&lang=${lang}`)
        .then((res) => res.json())
        .then(async (data) => {
          setWeatherData(data);
          if (setWeather) setWeather(data);
          onWeatherTypeChange?.(data.weather?.[0]?.main);
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [location, onWeatherTypeChange, setWeather, i18n.language]);

  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return <div>{t("dashboard.seller.weather-suggestion.weather_card.loading")}</div>;
  }

  return (
    <div className="p-4 bg-blue-100/50 backdrop-blur-md w-fit rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">{t("dashboard.seller.weather-suggestion.weather_card.title")}</h2>
      <p>{t("dashboard.seller.weather-suggestion.weather_card.temperature", { temp: weatherData?.main?.temp })}</p>
      <p>{t("dashboard.seller.weather-suggestion.weather_card.humidity", { humidity: weatherData?.main?.humidity })}</p>
      <p>{t("dashboard.seller.weather-suggestion.weather_card.wind", { speed: weatherData?.wind?.speed })}</p>
      <p>{t("dashboard.seller.weather-suggestion.weather_card.condition", { description: weatherData?.weather?.[0]?.description })}</p>
    </div>
  );
};

export default WeatherCard;
