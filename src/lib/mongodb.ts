import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to MongoDB");
        console.log("connection: " + mongoose.connections.length);
    } catch (error) {
        throw new Error("Error in connecting to MongoDB");
    }
};

export default connectDb;
