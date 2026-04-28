import express from "express";
import {
    getItems,
    createItem,
    updateItem,
    deleteItem,
    getMyItems,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", protect, createItem);
router.put("/:id", protect, updateItem);
router.put("/:id", protect, deleteItem);
router.get("/my-reports", protect, getMyItems);

export default router;
