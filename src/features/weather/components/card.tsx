import { CloudRain, CloudSunRain, Sun } from "lucide-react";
import type { ForecastPeriod } from "../../../utils/types";

type Props = {
  period: ForecastPeriod;
};

const getWeatherIcon = (precipitation: number, maxTemp: number) => {
  // High chance of rain
  if (precipitation > 50) {
    return maxTemp > 80 ? (
      <CloudSunRain className="size-10 text-yellow-500" />
    ) : (
      <CloudRain className="size-10 text-gray-500" />
    );
  }

  // Medium chance of rain/clouds
  if (precipitation > 20 && maxTemp > 50) {
    return <CloudSunRain className="size-10 text-yellow-500" />;
  }

  // Clear/sunny
  return <Sun className="size-10 text-yellow-500" />;
};

export const Card = ({ period }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-50 text-slate-900 shadow-md min-w-lg p-2">
      <h5 className="text-lg font-semibold flex flex-col text-left flex flex-1">
        {period.startTime.format("DD MMM")}
        <span className="text-sm text-slate-700">
          {period.startTime.format("dddd")}
        </span>
      </h5>
      <div className="flex items-center justify-center gap-x-2 text-sm flex-1">
        <span>
          <span className="text-xl gap-x-2 flex">
            <span className="font-semibold">{period.maxTemp}</span>°
            {period.temperatureUnit}
          </span>
        </span>
        /
        <span>
          <span className="text-xl gap-x-2 flex">
            <span className="font-semibold">{period.minTemp}</span>°
            {period.temperatureUnit}
          </span>
        </span>
      </div>
      <div className="flex flex-1 justify-end">
        {getWeatherIcon(
          period.probabilityOfPrecipitation.value,
          period.maxTemp
        )}
      </div>
    </div>
  );
};
