const express = require('express')
const noteModel = require("../models/note.model.js")

const app = express()
app.use(express.json())


app.post("/notes",async (req,res)=>{
    const data = req.body
    noteModel.create({
        title:data.title,
        description:data.description
    })

    res.status(201).json({
        message:"note or data send successfully"
    })

})

app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find()    //return data in this format []

    // const notes = await noteModel.findOne({//it gives you first node based on the condition it gives null if not present but find gives empty array
    //     title:"my 1 rest api class"
    // } )

    res.status(200).json({
        message:"notes ffetched successfully",
        notes:notes
    })
})




module.exports = app