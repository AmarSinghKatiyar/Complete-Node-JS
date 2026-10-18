create workspace-> blank workspace -> name -> create

notes=[]

app.post("/notes",(req,res)=>{
    log(req.body) gives whole data comes from frontend
    return res.status(201).json({
        //return message using res
    })
})

app.get("/notes",(req,res)=>{
    return res.status(200).json({
        message:"notes gets successfully",
        notes:notes
    })
})

app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index
    delete notes[ index ]

    return res.status(200).json({
        message:"notes deleted successfully"
    })
    //so after deleting that node in post man when we againg get data the in place of that node data we get null
})

app.patch("/notes/:index",(req,res)=>{
    const index=req.params.index
    const data = rwq.body //return data in json format {title, discription} also fro updataing title we have to program that also like discription
    const description = req.body.description

    notes[ index ].discription = discription

    return res.status(200).json({
        message:"notes updated successfully"
        notes:notes
    })
})

types of server:-
web server for web site
mail server for email
data base server for data base management
file server for data storage
application srevr for running application
proxy server for intermediaries

DNS SERVER FOR NAME RESOLUTION
FTP SERVER FOR FILE TRANSFER

cluster->databse->collection

npm i mongoose express dotenv

import mongoose from "mongoose"

export async function connectDB() {

    await mongoose.connect(process.env.Mongo_URI)//wait untill mongodb cant connect

    console.log("DATABASE connected successfully");
    

}

import app from "./src/app.js"
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB()

app.listen(3000,()=>{
    console.log("server started successfully at 3000");
})

inside src->app.js

import express from "express"

const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello now i am completing my backend completely")
})

export default app

//now for creating schema we use models folder inside we create schemas
like note = {title:string,discription:string}

import mongoose from "mongoose"

const noteSchema = new mongoose.schema({
    title:string,
    discription:string
})

const noteModel = mongoose.model("nodeModel",noteSchema)

export default noteModel

now we use that model schema in app.js so impport it and use the http method ->get,post,put,patch,delete



import express from "express"
import noteModel from "../models/Note.models.js"

const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello now i am completing my backend completely")
})

app.post("/notes", async (req,res)=>{
    const data = req.body
    await noteModel.create({ //used to create notes in models we use create ethod in post since we dont know how much time it need to create every time to create a newModel in database called note so we use await for wait to complete that task
        title:data.title,
        discription:data.discription
    })
    
    return res.status(201).json({
        message:"note created successfilly",
        success:true
    })
})

app.get("/notes",async (req,res)=>{
    //for sending data to frontend from backend we have to first get data from mongo db to get it we use find method or findall like noteModel.find() retrun all data nodes in an array format [] but findOne is used to get only particular data, for if duplicate nodes present then first one along with we have to give condition on which basis findOne give result also if condition not match then it give null as output get for this we have to wait and req.body is used to fetch data from frontend not backend
    const data = await noteModel.find() //inplace od data we use notes also in this also we give condition and if not match then it give empty array 
    const data2 = await noteModel.findOne({
        title:"title3"
    })//condition not match give null as output

    console.log(data);

    return res.status(200).json({
        message:"data fetch successfully",
        success:true,
        data:data
    })
    
})

app.delete("/notes/:id",async (req,res)=>{
    //inthis method we dont have index so we id and with the help id we delete the node using findOneAndDelete({condition})

    const id =req.params.id
    await noteModel.findOneAndDelete({
        _id:id
    })

    //const deleteNote =await noteModel.findByIdAndDelete(id)

    const notes = await noteModel.find()

    return res.status(200).json({
        message:"note ddeleted successfully",
        success:true,
        notes:notes,
        // message:"deleted note",
        // deleteNote:deleteNote
    })
})

app.patch("/notes/:id",async (req,res)=>{
    const data = req.body
    const id = req.params.id

    // const updatenote = await noteModel.findByIdAndUpdate(
    //     id,
    //     req.body,
    //     { new:true }
    // )

    await noteModel.findOneAndUpdate({
        _id:id
    },{
        title:data.title,
        discription:data.discription
    })
})

export default app


instagram app
create post -> form->image and caption and submit button
posts->all popst having image along with caption seperate post

image-> cloud storage provider-> url