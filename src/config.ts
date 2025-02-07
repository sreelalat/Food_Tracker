//MongoDB connection
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connects to MongoDB Atlas using Mongoose.
 * If the connection attempt fails, it prints an error message
 * and terminates the process with a non-zero exit code.
 */
const connectDB  = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string, {
            serverSelectionTimeoutMS: 5000,
        }); 
        console.log("✅ MongoDB Atlas Connected!")
    } catch(error){
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}

export default connectDB;
