import { useState } from "react";

export const useGeocoding = () => {
    const [geocoding, setGeocoding] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGeocoding = async (address: string) => {
        if (!address.trim()) return;
        
        setLoading(true);
        setError(null);
        try {
            // Use the proxy endpoint instead of direct API
            const url = `/api/geocode?address=${encodeURIComponent(address)}&benchmark=2020&format=json`;
            
            const response = await fetch(url);
            
            const data = await response.json();
            
            setGeocoding(data.result.addressMatches);
        } catch (err) {
            console.error('Geocoding error:', err);
            setError(err instanceof Error ? err.message : 'Failed to geocode address');
        } finally {
            setLoading(false);
        }
    };

    return { geocoding, loading, error, fetchGeocoding };
}
    