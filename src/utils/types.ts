import dayjs from "dayjs";

export type ForecastPeriod = {
    number: number;
    name: string;
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    maxTemp: number;
    minTemp: number;
    windSpeed: string;
    windDirection: string;
    probabilityOfPrecipitation: {
        value: number;
    };
    shortForecast: string;
    detailedForecast: string;
};