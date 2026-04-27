import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        // Exit the process with failure.
        process.exit(1); 
    }
};