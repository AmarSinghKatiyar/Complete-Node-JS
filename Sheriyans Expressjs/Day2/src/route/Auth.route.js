import express from "express"
import { registerUser } from "../controller/Auth.controller.js"


const router = express.Router()

/*post /api/auth/register then goto app.js for app.use("/api/auth",whatever name througth called this file in app.js)*/
router.post("/register",registerUser)


export default router