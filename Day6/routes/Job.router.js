import express from "express"
import { allJobs, createJob, deleteJob, updateJob } from "../controller/Job.controller"

const router = express.Router()

router.post('/createJob',createJob)
router.get('/allJob',allJobs)
router.delete('/updateJob/:id',updateJob)
router.patch('deletJob/:id',deleteJob)

export default router