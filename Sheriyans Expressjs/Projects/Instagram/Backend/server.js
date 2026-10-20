import app from "./src/app.js";
import { config } from "dotenv";
import { connectDB } from "./src/db/db.js";

config()
connectDB()

app.listen(3000,()=>{
    console.log("server started successfully on 3000 port");
})