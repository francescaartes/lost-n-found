import Item from "../models/itemModel.js";

// Get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate("postedBy", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new item
export const createItem = async (req, res) => {
    try {
        // console.log("FILES FROM CLOUDINARY:", req.files);

        const imageUrls = req.files
            ? req.files.map((file) => file.secure_url)
            : [];
        const location = JSON.parse(req.body.location);
        const contactPreference = JSON.parse(req.body.contactPreference);

        const newItem = await Item.create({
            ...req.body,
            location,
            contactPreference,
            images: imageUrls,
            postedBy: req.user.id,
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to create item",
        });
    }
};

// Update an item
export const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ message: "Item not found" });

        if (item.postedBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this item",
            });
        }

        const existingImages = req.body.existingImages
            ? JSON.parse(req.body.existingImages)
            : item.images;

        let newImageUrls = [];
        if (req.files && req.files.length > 0) {
            newImageUrls = req.files.map((file) => file.secure_url);
        }

        const allImages = [...existingImages, ...newImageUrls];

        const location = req.body.location
            ? JSON.parse(req.body.location)
            : item.location;

        const contactPreference = req.body.contactPreference
            ? JSON.parse(req.body.contactPreference)
            : item.contactPreference;

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                location,
                contactPreference,
                images: allImages,
            },
            { returnDocument: "after", runValidators: true },
        );

        res.json(updatedItem);
    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete an item
export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ message: "Item not found" });

        if (item.postedBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this item",
            });
        }

        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" }); // Added response
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get items owned by the logged-in user
export const getMyItems = async (req, res) => {
    try {
        const items = await Item.find({ postedBy: req.user.id })
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch your reports" });
    }
};
