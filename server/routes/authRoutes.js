import express from "express";
import {
    register,
    login,
    getMe,
    logout,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/me", getMe);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
