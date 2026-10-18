import mongoose from "mongoose"

export async function ConnectDB(){
    try {
        await mongoose.connect(process.env.Mongo_URI);
    console.log("database connected successfully");
    } catch (error) {
        console.error(error);
        throw(error);
    }
    
}
