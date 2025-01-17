import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "http://localhost:27017");
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;