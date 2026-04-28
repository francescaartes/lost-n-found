import Item from "../models/itemModel.js";
import jwt from "jsonwebtoken";

// Get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate("postedBy", "name")
            .sort({ createdAt: -1 }); // Newest first
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new item
export const createItem = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ message: "You must be logged in to post an item." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const newItem = await Item.create({
            ...req.body,
            postedBy: decoded.id,
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error("CREATE ITEM ERROR:", error);
        res.status(400).json({
            message: error.message || "Failed to create item",
        });
    }
};
