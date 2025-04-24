import React from "react";

const WeatherAdviceCard = ({ weatherType, temp }) => {
  let advice = "";

  if (temp >= 35) {
    advice = "আজকের তাপমাত্রা খুব বেশি (৩৫°C এর উপরে)। গমের জন্য অতিরিক্ত সেচ দিন। 🌾💧";
  } else if (weatherType === "Rain") {
    advice = "আজ বৃষ্টি হতে পারে। গাছের যত্নে ছাউনি ব্যবহার করুন। 🌧️";
  } else if (weatherType === "Clear") {
    advice = "আবহাওয়া পরিষ্কার, চাষাবাদের জন্য উপযুক্ত সময়। 🌞🌱";
  } else if (weatherType === "Thunderstorm") {
    advice = "ঝড়ের আশঙ্কা রয়েছে। শস্য ঢেকে রাখুন এবং নিরাপদে থাকুন। ⛈️";
  } else {
    advice = "আবহাওয়ার ভিত্তিতে বিশেষ কোনো সতর্কতা নেই। চাষাবাদ চালিয়ে যান। 🌿";
  }

  return (
    <div className="mt-4 p-4 bg-green-100/60 backdrop-blur-md rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2">🌾 কৃষি পরামর্শ</h3>
      <p>{advice}</p>
    </div>
  );
};

export default WeatherAdviceCard;
