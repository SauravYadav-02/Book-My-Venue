// src/services/venueService.ts
import axios from "axios";
import type { VenueForm } from "../Page/vendor/AddVenue/types/Interface";

const API_URL = "http://localhost:3001/venues"; // replace with your API endpoint

export interface CreateVenueResponse {
    id: string;
    name: string;
    // add other response fields if needed
}

export const createVenue = async (form: VenueForm): Promise<CreateVenueResponse> => {
    try {
        const payload = {
            ...form,
            amenities: form.amenities ? Array.from(form.amenities) : [],
        };

        const response = await axios.post<CreateVenueResponse>(API_URL, payload);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};