export const CATEGORIES = [
    "Electronics",
    "Pets",
    "Documents",
    "ID",
    "Wallet",
    "Keys",
    "Clothing",
    "Other",
];

export const CONTACT_METHODS = ["Email", "Phone", "Social Media"];

export const DEFAULT_STATE = {
    title: "",
    category: "Other",
    description: "",
    type: "Lost",
    location: { name: "", coordinates: { lat: 0, lng: 0 } },
    contactPreference: { method: "Email", value: "" },
};
