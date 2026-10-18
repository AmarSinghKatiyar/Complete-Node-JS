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