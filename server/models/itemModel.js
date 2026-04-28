import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: {
            type: String,
            enum: [
                "Electronics",
                "Pets",
                "Documents",
                "ID",
                "Wallet",
                "Keys",
                "Clothing",
                "Other",
            ],
            required: true,
        },
        description: { type: String, required: true },
        type: { type: String, enum: ["Lost", "Found"], required: true },
        location: {
            name: { type: String, required: true },
            coordinates: {
                lat: { type: Number },
                lng: { type: Number },
            },
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        contactPreference: {
            method: {
                type: String,
                enum: ["Email", "Phone", "Messenger"],
                required: true,
            },
            value: { type: String, required: true },
        },
        status: {
            type: String,
            enum: ["Unresolved", "Resolved"],
            default: "Unresolved",
        },
    },
    { timestamps: true },
);

export default mongoose.model("Item", itemSchema);
