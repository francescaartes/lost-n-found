import Item from "../models/itemModel.js";

// Get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new item
export const createItem = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem); // 201 means successful
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
