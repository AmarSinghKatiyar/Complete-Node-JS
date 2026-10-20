import express from 'express'
import authRoutes from './route/Auth.route.js'

const app=express()
app.use(express.json())

/*api/auth/register*/
app.use("/api/auth",authRoutes)


export default app