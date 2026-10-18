import { trusted } from "mongoose";
import User from "../models/User.model.js";

export async function createUser(req,res){
    try {
        const userDetails = req.body
        if(!userDetails){
            return res.status(404).json({
                message:"user details not accessed",
                success:false
            })
        }
        const newUser = await User.create(userDetails)
        if(!newUser){
            return res.status(404).json({
                message:"user can't created",
                success:false
            })
        }
        res.status(201).json({
            message:"data/node/document created successfully",
            success:true,
            newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}

// export async function allUser(req,res) {
//     try {
//         const allUsers = await User.find()
//         if(allUser.length==0 || !allUser){
//             return res.status()
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message:"Internal server error",
//             success:false
//         })
//     }
// }


export async function allUser(req, res) {
    try {
        const allUsers = await User.find();

        if (!allUsers || allUsers.length === 0) {
            return res.status(200).json({
                message: "No users found",
                success: true,
                users: []
            });
        }

        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            totalUsers: allUsers.length,
            users: allUsers
        });

    } catch (error) {
        console.error("Error fetching users:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


export async function deleteUser(req,res) {
    try {
        const id = req.params.id //write what is pased in route of delete router
        if(!id){
            return res.status(404).json({
                message:"ID can't be access",
                success:false
            })
        }
        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser){
            return res.status(404).json({
                message:"User can't be deleted",
                success:false
            })
        }
        return res.status(200).json({
            message:"User Deleted Successfully",
            success:true,
            deleteUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
}

export async function updateUser(req,res) {
    try {
        const { id }= req.params;//because req.params return an object
        const updateData =req.body;

        if(!id){
            return res.status(400).json({
                message:"User ID is Required",
                success:false
            })
        }

        const allowFields = ["fullname","email"]
        const filterData = {}

        for(const i of allowFields){
            if(updateData[i]!==undefined){
                filterData[i]=updateData[i]
            }
        }

        if(Object.keys(filterData).length===0){
            return res.status(400).json({
                message:"No valid field provided for update",
                success:false
            })
        }

        const updateUser = await User.findByIdAndUpdate(
            id,
            {$set:filterData},
            {
                new:true,
                runValidators:true
            }
        )

        if(!updateUser){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"User updated successfully",
            success:true,
            updateUser
        })

    } catch (error) {
        console.error("error updateing user",error);

        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
        
    }
}