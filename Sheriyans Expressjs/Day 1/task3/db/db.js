// const mongoose = require("mongoose");
// require("dotenv").config();


// async function connectDB(){
//     await mongoose.connect()
//     console.log("connected to DB");
    
// }

// module.exports = connectDB

const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(){

    await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to DB");

}

module.exports = connectDB;
