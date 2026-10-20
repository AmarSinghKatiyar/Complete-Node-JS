import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.Mongo_URI,{
            dbName:"TOKEN_AUTHENTICATION"
        })
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error(error);
    }
}