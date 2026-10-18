import express from "express"
import { allUser, createUser, deleteUser, updateUser } from "../controller/User.controller.js"

const router = express.Router()

//write whatever you want comes after this https://localhost:3000/\
 
router.post('/create',createUser)
router.get('/alluser',allUser)
router.delete('/delete/:id',deleteUser)
router.patch('/updateUser/:id',updateUser)


export default router
