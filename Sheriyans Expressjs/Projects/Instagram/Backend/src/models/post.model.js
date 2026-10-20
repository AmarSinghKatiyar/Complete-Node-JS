import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
})

// inside mongoose.model("this tell what is the name of collection will",schema name)

const posts = mongoose.model("posts",postSchema)

export default posts