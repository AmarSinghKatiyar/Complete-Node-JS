const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = require('./src/app.js')
const connectDB = require('./db/db.js')

// connectDB()

// app.get("/",(req,res)=>{
//     res.send("hello i am server !!!")
// })

// app.listen(9999,()=>{
//     console.log("server start successfully"); 
// })

connectDB()
    .then(() => {
        app.listen(9999, () => {
            console.log("server start successfully");
        });
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    });