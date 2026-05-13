"use client";
import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        console.warn("Unable to retrieve your location");
      }
    );
  }, []);

  return location;
};

export default useGeolocation;
