import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import CloudinaryStorage from "multer-storage-cloudinary";

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "lost-n-found",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
    },
});

export const upload = multer({ storage });
