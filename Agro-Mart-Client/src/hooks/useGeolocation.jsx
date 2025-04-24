import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
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
        alert("Unable to retrieve your location");
      }
    );
  }, []);

  return location;
};

export default useGeolocation;
