import { createContext, useEffect, useState, type ReactNode } from "react";
import { getApprovedVenues, type Venue } from "../services/VenueUserservice ";

export interface VenueContextType {
    venues: Venue[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const VenueContext = createContext<VenueContextType | null>(null);

export function VenueProvider({ children }: { children: ReactNode }) {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVenues = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getApprovedVenues();
            setVenues(data);
        } catch (err: unknown) {
            setError(err as string);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    return (
        <VenueContext.Provider value={{ venues, loading, error, refetch: fetchVenues }}>
            {children}
        </VenueContext.Provider>
    );
}