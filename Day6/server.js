import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./db/db.js"
import User from "./models/User.model.js";
import userRouter from "./routes/User.router.js";



dotenv.config({})


const app = express()

ConnectDB()

app.use(express.json())

app.use('/api/user',userRouter)
//app.use('/api/job',jobRouter)
//app.use('/api/company'.companyRouter)


// write a post api alredy written in controllers

/*app.post("/user/create", async (req, res) => {
    try {
        const userDetails = req.body
        console.log(userDetails);
        const user = await User.create(userDetails);
        res.status(201).json({
            message: "data send succesfully",
            success: true,
            user: user
        })
    } catch (error) {
        res.status(500).json({
            message:"Error creating user",
            error:error.message
        })
    }
})*/

// get api
/*app.get("/user",async (req,res)=>{
    try {
        const users =await User.find()
        res.status(200).json({
            message:"data fetched succesfully",
            succes:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            message:"data fetching error",
            error:error.message
        })
    }
})
*/

/*app.get("/", (req, res) => {
    res.send("hello my backend");
})*/

app.listen(3000, () => {
    console.log("server started successfully");
})