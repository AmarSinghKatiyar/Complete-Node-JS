import app from "./src/app.js";
import { config } from "dotenv"
import { connectDB } from "./src/db/db.js";


config()
connectDB()


app.get("/",(req,res)=>{
    return res.send("hello i am amar and i started server successfully")
})

app.listen(3000,()=>{
    console.log("server started successfully");
    
})