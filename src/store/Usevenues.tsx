import { useContext } from "react";
import { VenueContext, type VenueContextType } from "./Venuecontext";

export function useVenues(): VenueContextType {
    const context = useContext(VenueContext);
    if (!context) throw new Error("useVenues must be used inside VenueProvider");
    return context;
}