import { useState } from "react";

type Props = {
    address: string;
}

interface Coordinates {
    x: number;
    y: number;
}

export const useGeocoding = ({ address }: Props) => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGeocoding = async () => {
        setIsLoading(true);

        setError(null);
        try {
            const url = `/api/geocode?address=${encodeURIComponent(address)}&benchmark=2020&format=json`;
            
            const response = await fetch(url);
            
            const data = await response.json();
            
            const coords = data.result.addressMatches[0].coordinates;
            
            setCoordinates(coords);
        } catch (err) {
            console.error('Geocoding error:', err);
            setError(err instanceof Error ? err.message : 'Failed to geocode address');
        } finally {
            setIsLoading(false);
        }
    };

    return { coordinates, isLoading, error, fetchGeocoding };
}
    