import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_STATE } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const mapDataToState = (data?: any) => {
    if (!data) return DEFAULT_STATE;

    return {
        title: data.title || "",
        category: data.category || "Other",
        description: data.description || "",
        type: data.type || "Lost",
        location: {
            name: data.location?.name || "",
            coordinates: {
                lat: data.location?.coordinates?.lat || 0,
                lng: data.location?.coordinates?.lng || 0,
            },
        },
        contactPreference: {
            method: data.contactPreference?.method || "Email",
            value: data.contactPreference?.value || "",
        },
    };
};
