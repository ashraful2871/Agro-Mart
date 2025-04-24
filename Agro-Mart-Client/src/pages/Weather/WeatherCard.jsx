import React, { useEffect, useState } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import { requestNotificationPermission } from "../../store/requestNotificationPermission";
import { TiWeatherPartlySunny } from "react-icons/ti";

const API_KEY = import.meta.env.VITE_Weather_API_KEY;

const WeatherCard = ({ onWeatherTypeChange, setWeather }) => {
  const location = useGeolocation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (location) {
      const { lat, lon } = location;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=bn`
      )
        .then((res) => res.json())
        .then(async (data) => {
          setWeatherData(data);
          setWeather(data);
          onWeatherTypeChange?.(data.weather[0].main);

          const granted = await requestNotificationPermission(); 

          if (granted) {
            const weatherMain = data.weather[0].main;
            const alerts = {
              Rain: "আজ বৃষ্টি হতে পারে, দয়া করে শস্য ঢেকে রাখুন। 🌧️",
              Thunderstorm: "ঝড়ের আশঙ্কা রয়েছে! সতর্ক থাকুন। ⛈️",
              Extreme: "তীব্র আবহাওয়া চলছে, কৃষিকাজে সতর্ক থাকুন। 🔥",
            };

            if (alerts[weatherMain]) {
              new Notification("🌦️ কৃষি সতর্কতা", {
                body: alerts[weatherMain],
                icon: <TiWeatherPartlySunny/>, 
              });
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location, onWeatherTypeChange, setWeather]);

  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return <div>আবহাওয়ার তথ্য লোড হচ্ছে...</div>;
  }

  return (
    <div className="p-4 bg-blue-100/50 backdrop-blur-md w-fit rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">আপনার এলাকার আবহাওয়া</h2>
      <p>🌡️ তাপমাত্রা: {weatherData?.main?.temp}°C</p>
      <p>💧 আর্দ্রতা: {weatherData?.main?.humidity}%</p>
      <p>🌬️ বাতাস: {weatherData?.wind?.speed} m/s</p>
      <p>🌥️ অবস্থা: {weatherData?.weather?.[0]?.description}</p>
    </div>
  );
};

export default WeatherCard;
