import express from "express";

const app=express()

app.get("/",(req,res)=>{
    res.end("this is home page")
})

app.get("/about",(req,res)=>{
    res.end("this is about page")
})

app.get("/contact",(req,res)=>{
    res.end("this is contact page")
})

app.get("/product",(req,res)=>{
    res.end("this is product page")
})

app.listen(9999,()=>{
    console.log("server started");
})