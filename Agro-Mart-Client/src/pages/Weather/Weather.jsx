import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import WeatherCard from "./WeatherCard";
import SuggestedProducts from "./SuggestedProducts";
import CropAdviceCard from "./CropAdviceCard";
import WeatherAdviceCard from "./WeatherAdviceCard";

const Weather = () => {
  const { t } = useTranslation();
  const [weatherType, setWeatherType] = React.useState(null);
  const [weather, setWeather] = React.useState(null);

  useEffect(() => {
    if (weatherType) {
      console.log("Weather type updated:", weatherType);
    }
  }, [weatherType]);

  useEffect(() => {
    // Fetching weather data or other logic to set weather
    // Assuming you are getting this data from WeatherCard component
    if (weather) {
      console.log("Weather data:", weather);
    }
  }, [weather]);

  return (
    <div className="p-6 ">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">
        {t("dashboard.seller.weather-suggestion.title")}
      </h1>
      <div className="flex flex-col md:flex-row gap-4 items-center mb-10 justify-center">
        <div>
          <WeatherCard
            onWeatherTypeChange={setWeatherType}
            setWeather={setWeather}
          />
        </div>
        <div>
          {weather && (
            <>
              <CropAdviceCard weather={weather} />
              <WeatherAdviceCard weatherType={weatherType} />
            </>
          )}
        </div>
      </div>
      {weatherType && (
        <div className="flex justify-center mx-auto">
          <SuggestedProducts weatherType={weatherType} />
        </div>
      )}
    </div>
  );
};

export default Weather;
