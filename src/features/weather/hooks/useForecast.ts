import dayjs from "dayjs";
import { useState } from "react";
import type { ForecastPeriod } from "../../../utils/types";

export const useForecast = () => {
    const [forecast, setForecast] = useState<ForecastPeriod[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchForecast = async (coordinates: { x: number, y: number }) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`https://api.weather.gov/points/${coordinates.y},${coordinates.x}`);
            
            const { properties } = await response.json();
            const forecastUrl = properties.forecast;

            const forecastResponse = await fetch(forecastUrl);

            const forecastData = await forecastResponse.json();

            const periods = forecastData.properties.periods?.map((period: ForecastPeriod) => {
                return {
                    ...period,
                    startTime: dayjs(period.startTime),
                    endTime: dayjs(period.endTime),
                }
            })

            setForecast(periods || []);

        } catch (err) {
            console.error('Forecast error:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch forecast');
        } finally {
            setLoading(false);
        }
    }

    return { fetchForecast, forecast, loading, error }   
}