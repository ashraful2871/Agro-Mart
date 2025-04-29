import { useTranslation } from "react-i18next";

const getCropAdvice = (temp, weatherMain, t) => {
  if (weatherMain === "Rain") {
    return t(
      "dashboard.seller.weather-suggestion.crop_advice_card.advice.rain"
    );
  } else if (temp > 34) {
    return t("dashboard.seller.weather-suggestion.crop_advice_card.advice.hot");
  } else if (temp < 18) {
    return t(
      "dashboard.seller.weather-suggestion.crop_advice_card.advice.cold"
    );
  } else {
    return t(
      "dashboard.seller.weather-suggestion.crop_advice_card.advice.normal"
    );
  }
};

// CropAdviceCard component
const CropAdviceCard = ({ weather }) => {
  const { t } = useTranslation();
  console.log("Received weather in CropAdviceCard:", weather);

  if (!weather?.main || !weather?.weather) return null;

  const advice = getCropAdvice(weather.main.temp, weather.weather[0].main, t);

  return (
    <div className="p-4 bg-green-100/60 backdrop-blur-md w-fit rounded-xl shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">
        {t("dashboard.seller.weather-suggestion.crop_advice_card.title")}
      </h2>
      <p className="text-green-900 font-medium">{advice}</p>
    </div>
  );
};

export default CropAdviceCard;
