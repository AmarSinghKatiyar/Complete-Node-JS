import app from "./src/app.js"
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB()

app.listen(3000,()=>{
    console.log("server started successfully at 3000");
})