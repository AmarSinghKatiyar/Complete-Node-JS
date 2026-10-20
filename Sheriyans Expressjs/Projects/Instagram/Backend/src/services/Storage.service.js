import { config } from "dotenv"
import ImageKit from "@imagekit/nodejs"

config()

const imageKit = new ImageKit({

    privateKey: process.env.imageKit_pass,

})

async function uploadFile(buffer) {

    const result = await imageKit.files.upload({
        file:buffer.toString('base64'),
        fileName:"image.jpg",
    })

    return result
}

export default uploadFile