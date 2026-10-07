const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel

/*CRUD OPERATION:-

C:-CREATE->Post
R:-Read->Get
U:-Update->Patch
D:-Delete->Delete

*/