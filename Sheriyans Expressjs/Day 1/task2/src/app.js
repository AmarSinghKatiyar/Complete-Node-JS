//server ko create karna bas nothing else and create server.js to start server in root directory
const express = require('express');

const app = express();
app.use(express.json())


/*
Jab hum Postman se backend ko JSON data bhejte hain, to express.json() us data ko readable format 
(req.body) mein convert karta hai, aur app.use() ise middleware ki tarah har request par apply karta hai.
*/

/*
note={
    title:"my first rest api class",
    description:"this is my first class of backend learning expressjs"
}

const notes = [
           {
                title:"my first rest api class",
                description:"this is my first class of backend learning expressjs"
            },
            {
                title:"my first rest api class",
                description:"this is my first class of backend learning expressjs"
            }     
    ]

*/

const notes=[]
// title,description
// POST /notes 
app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body)

    res.status(201).json({
        message:"note created succesffuly"
    })
})

// GET /notes 
app.get("/notes",(req,res)=>{
    res.status(200).json({
        message:"data send successfully",
        notes:notes
    })
})


module.exports = app;