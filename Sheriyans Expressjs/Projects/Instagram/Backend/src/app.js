import express from "express"
import multer from "multer"
import uploadFile from "./services/Storage.service.js"
import postModel from "./models/post.model.js"
import cors from 'cors'

const app = express()

//express can only handle data that comes in raw format when data comes in form-data means image type or any file then we have to use multer
app.use(express.json())
app.use(cors())

//multer is used when data comes in form-data format 
const upload = multer({storage:multer.memoryStorage() })


app.post("/create-post",upload.single("image"),async (req,res)=>{

    // console.log(req.body);
    // console.log(req.file);

    const result = await uploadFile(req.file.buffer)
    // console.log(result);

    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })
    // console.log(post);


    return res.status(200).json({
        message:"file sent successfully",
        success:true,
        post
    })
    
})

app.get("/posts",async (req,res)=>{

    const post = await postModel.find()

    return res.status(200).json({
        message:"data get successfully",
        success:true,
        post
    })
})

export default app