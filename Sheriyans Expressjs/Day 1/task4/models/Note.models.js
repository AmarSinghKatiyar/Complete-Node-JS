import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title:String,
    discription:String
})

const nodeModel = mongoose.model("noteModel",noteSchema)

export default nodeModel