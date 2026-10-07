// import http from "http";

// const server = http.createServer((req,res)=>{
//     res.end("hello i am amar")
//     if(req.url=="/"){
//         res.end("Home page")
//     }
// })

// server.listen(3000,()=>{
//     console.log("server started");

// })

import express from "express";

const app = express();

app.get("/", (req, res) => {
    message: "server started succesfully"
})

app.listen(3000,()=>{
    console.log("server started successfully");
})