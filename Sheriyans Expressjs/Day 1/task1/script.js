const express = require('express');

const app = express();//server par instance create kar rahe hai

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.get("/about",(req,res)=>{
    res.send("about page");
})

app.listen(4000);//server ko start karne ke liye 