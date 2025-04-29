


const getCropAdvice = (temp, weatherMain) => {
  if (weatherMain === "Rain") {
    return "☔ আজ বৃষ্টি হতে পারে, গাছের চারপাশে পানি জমতে দেবেন না।";
  } else if (temp > 34) {
    return "🔥 আজকের তাপমাত্রা বেশি, গমের জন্য বেশি সেচের প্রয়োজন হতে পারে।";
  } else if (temp < 18) {
    return "❄️ আজকের আবহাওয়া ঠান্ডা, আলু চাষে গরম পানি সেচ দিন।";
  } else {
    return "✅ আজকের আবহাওয়া কৃষিকাজের জন্য উপযোগী।";
  }
};

// CropAdviceCard component
const CropAdviceCard = ({ weather }) => {
  console.log("Received weather in CropAdviceCard:", weather);

  if (!weather?.main || !weather?.weather) return null;

  const advice = getCropAdvice(weather.main.temp, weather.weather[0].main);

  return (
    <div className="p-4 bg-green-100/60 backdrop-blur-md w-fit rounded-xl shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">🧑‍🌾 কৃষি পরামর্শ</h2>
      <p className="text-green-900 font-medium">{advice}</p>
    </div>
  );
};

export default CropAdviceCard;
