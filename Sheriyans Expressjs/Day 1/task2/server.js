//it is used to start the server file that is create dinside the src folder named app.js

const app = require("./src/app.js");

app.get("/",(req,res)=>{
    res.send("hello how are you !!!!!")
})


app.listen(4000,()=>{
    console.log("server is running on port 3000");
});