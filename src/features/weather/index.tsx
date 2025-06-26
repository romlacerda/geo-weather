import { useEffect, useState } from "react";
import { Card } from "./components/card";
import { useGeocoding } from "./hooks/useGeocoding";

export const Weather = () => {
  const [city, setCity] = useState("");

  const { geocoding, fetchGeocoding } = useGeocoding();

  console.log(geocoding, "-> geocoding");

  useEffect(() => {
    fetchGeocoding(city);
  }, [city]);

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border text-black"
      />
      <div className="flex items-center justify-center gap-x-8">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
