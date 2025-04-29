import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGeolocation from "../../hooks/useGeolocation";
import { requestNotificationPermission } from "../../store/requestNotificationPermission";

const API_KEY = import.meta.env.VITE_Weather_API_KEY;

const WeatherCard = ({ onWeatherTypeChange, setWeather }) => {
  const { t, i18n } = useTranslation();
  const location = useGeolocation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (location) {
      const { lat, lon } = location;
      const lang = i18n.language === "bn" ? "bn" : "en"; // Set API language based on current language
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          setWeatherData(data);
          if (setWeather) {
            setWeather(data); // Only call if setWeather is defined
          }
          onWeatherTypeChange?.(data.weather[0].main);

          const granted = await requestNotificationPermission();

          if (granted) {
            const weatherMain = data.weather[0].main;
            const alerts = {
              Rain: t(
                "dashboard.seller.weather-suggestion.weather_card.notifications.rain"
              ),
              Thunderstorm: t(
                "dashboard.seller.weather-suggestion.weather_card.notifications.thunderstorm"
              ),
              Extreme: t(
                "dashboard.seller.weather-suggestion.weather_card.notifications.extreme"
              ),
            };

            if (alerts[weatherMain]) {
              new Notification(
                t(
                  "dashboard.seller.weather-suggestion.weather_card.notifications.title"
                ),
                {
                  body: alerts[weatherMain],
                  icon: "/path/to/weather-icon.png", // Use a valid image URL
                }
              );
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location, onWeatherTypeChange, setWeather, t, i18n.language]);

  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return (
      <div>{t("dashboard.seller.weather-suggestion.weather_card.loading")}</div>
    );
  }

  return (
    <div className="p-4 bg-blue-100/50 backdrop-blur-md w-fit rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">
        {t("dashboard.seller.weather-suggestion.weather_card.title")}
      </h2>
      <p>
        {t("dashboard.seller.weather-suggestion.weather_card.temperature", {
          temp: weatherData?.main?.temp,
        })}
      </p>
      <p>
        {t("dashboard.seller.weather-suggestion.weather_card.humidity", {
          humidity: weatherData?.main?.humidity,
        })}
      </p>
      <p>
        {t("dashboard.seller.weather-suggestion.weather_card.wind", {
          speed: weatherData?.wind?.speed,
        })}
      </p>
      <p>
        {t("dashboard.seller.weather-suggestion.weather_card.condition", {
          description: weatherData?.weather?.[0]?.description,
        })}
      </p>
    </div>
  );
};

export default WeatherCard;
