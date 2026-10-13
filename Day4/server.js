import express from "express";

const app = express();

app.use(express.json())//use for getting data from frontend inbuilt middle ware work between res,req; 

const middleware1 = (req,res,next)=>{//application middleware
    //middleware 1
    console.log("Middleware 1 started");
    next();
}

const middleware2 = (req,res,next)=>{//application middleware
    //middleware 1
    console.log("Middleware 2 started");
    next();
}

app.get("/",middleware1,(req,res)=>{
    message:"hello i am server"
    res.send("hello i am amar")
})

app.get("/about",middleware1,middleware2,(req,res)=>{//route
    message:"hello i am middleware 2 function"
    res.send("hello i am handsome")
})

app.listen(1000,()=>{
    console.log("server started");
})