export interface AvailabilityEntry {
    date: string;
    status: "available" | "booked";
}

export interface VenueForm {
    name: string;
    type: string;
    capacity: string;
    description: string;
    pricePerHour: string;
    pricePerDay: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    lat: string;
    lng: string;
    amenities: Set<string>;
    availability: AvailabilityEntry[];
    mediaFiles: string[];
}

export type FormErrors = Partial<Record<keyof VenueForm | string, string>>;
