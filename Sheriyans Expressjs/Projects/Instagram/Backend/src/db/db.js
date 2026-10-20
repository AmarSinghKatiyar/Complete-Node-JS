import mongoose from "mongoose"

export async function connectDB() {
    await mongoose.connect(process.env.Mongo_Uri,{
    dbName: "InstagramProject"//if not define the dbName then it take data to test collection inside
    
})
    console.log("databse connected successfully");
    
}