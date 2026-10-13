import express from "express";
import dotenv from 'dotenv'
import { connectDb } from "./db/db.js";

dotenv.config({})

const app = express();
app.use(express.json());

connectDb()

app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(3000,()=>{
    console.log("server started");
})