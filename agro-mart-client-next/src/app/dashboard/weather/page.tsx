"use client";
import { useState } from "react";
import WeatherCard from "@/components/weather/WeatherCard";

export default function WeatherPage() {
  const [weatherType, setWeatherType] = useState<string>("");

  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">Weather Dashboard</h1>
      <WeatherCard onWeatherTypeChange={setWeatherType} />
    </div>
  );
}
