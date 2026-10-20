import userModel from "../models/User.model.js";
import jwt from 'jsonwebtoken'

export async function registerUser(req,res){
    const { username, email, password } = req.body

    const user = await userModel.create({
        username,email,password
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)//this create a token and give to you but it takes 2 values in object format means ye 2 value leta hai ek value jo ki user ki hoti hai or vo unique honi chiye har ek user ke liye like id but passed inside object format and 2 value is the jwt env value 
    
    return res.status(201).json({
        message:"user registered successfully",
        user,
        token,
        success:true
    })
}