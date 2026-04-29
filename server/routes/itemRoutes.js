import express from "express";
import {
    getItems,
    createItem,
    updateItem,
    deleteItem,
    getMyItems,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getItems);
router.get("/my-reports", protect, getMyItems);

router.post("/", protect, upload.array("images", 3), createItem);
router.put("/:id", protect, upload.array("images", 3), updateItem);

router.delete("/:id", protect, deleteItem);

export default router;
