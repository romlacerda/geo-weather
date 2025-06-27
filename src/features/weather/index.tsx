import { useEffect } from "react";
import { useState } from "react";
import { Card } from "./components/card";
import { useGeocoding } from "./hooks/useGeocoding";
import { useForecast } from "./hooks/useForecast";
import dayjs from "dayjs";
import { AlertCircle, Loader } from "lucide-react";
import type { ForecastPeriod } from "../../utils/types";

// added this hard coded address because this API is a little bit restricted
const address = "4600 Silver Hill Rd, Washington, DC 20233";

export const Weather = () => {
  const { coordinates, error, fetchGeocoding } = useGeocoding({
    address,
  });

  useEffect(() => {
    fetchGeocoding();
  }, []);

  const {
    forecast,
    fetchForecast,
    loading: forecastLoading,
    error: forecastError,
  } = useForecast();

  useEffect(() => {
    if (coordinates) {
      const latitude = coordinates.y;
      const longitude = coordinates.x;

      fetchForecast({
        x: longitude,
        y: latitude,
      });
    }
  }, [coordinates]);

  const groupedForecast = forecast.reduce((acc, period, index) => {
    if (index === forecast.length - 1) {
      return acc;
    }

    const currentDate = dayjs(period.startTime).format("YYYY-MM-DD");

    const nextDate = dayjs(forecast[index + 1].startTime).format("YYYY-MM-DD");

    if (currentDate === nextDate) {
      acc.push({
        ...period,
        maxTemp: period.temperature,
        minTemp: forecast[index + 1].temperature,
        endTime: forecast[index + 1].endTime,
      });
    }

    return acc;
  }, [] as ForecastPeriod[]);

  console.log(groupedForecast);

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <h1 className="text-2xl font-bold text-slate-900">Weather Forecast</h1>
      <div className="flex items-center justify-center gap-x-2 mb-8">
        <p className="text-sm text-slate-500">
          <input
            value={address}
            disabled
            className="border rounded-md p-2 min-w-lg border-slate-300"
          />
        </p>
      </div>
      {forecastLoading ||
        (groupedForecast.length === 0 && (
          <div className="flex items-center justify-center gap-x-2 text-slate-500 text-sm">
            <Loader className="size-4 animate-spin" /> Loading...
          </div>
        ))}
      {(error || forecastError) && (
        <div className="flex items-center justify-center gap-x-2 text-sm text-rose-500">
          <AlertCircle className="size-4" /> Error:{" "}
          {error || forecastError || "Something went wrong"}
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-x-8 gap-y-2">
        {groupedForecast.map((period, idx) => {
          return <Card key={idx} period={period} />;
        })}
      </div>
    </div>
  );
};
