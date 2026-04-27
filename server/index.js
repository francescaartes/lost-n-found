import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Load variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());

// API health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});