import Job from "../models/Job.model.js";

// POST - Create Job
export async function createJob(req, res) {
    try {
        // const job = await Job.create(req.body);
        const jobDetails = req.body
        if(!jobDetails){
            return res.status(404).json({
                message:"Job details not accessed",
                success:false
            })
        }

        const newJob = await Job.create(jobDetails)
        if(!newJob){
            return res.status(404).json({
                message:"Job cant created",
                message:false
            })
        }

        return res.status(201).json({
            message:"JOB created successfully",
            success: true,
            newJob
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// GET - Get All Jobs
export async function allJobs(req, res) {
    try {
        const jobs = await Job.find();

        if(!jobs || jobs.length===0){
            return res.status(200).json({
                message:"NO jobs found",
                success:true,
                jobs:[]
            })
        }

        return res.status(200).json({
            message:"Job details fetched successfully",
            success: true,
            totalJobs:jobs.length,
            jobs
        });

    } catch (error) {
        console.error("Error in fetching Job details",error);
        
        return res.status(500).json({
            message:"Internal server error",
            success: false
        });
    }
}

// PATCH - Update Job

export async function updateJob(req, res) {
    try {
        const id  = req.params.id
        if(!id){
            return res.status(404).json({
                message:"ID cant be access",
                success:false
            })
        }
        const updateJob = await Job.findById(id);

        if (!updateJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const updateData = structuredClone(req.body);

        Object.assign(updateJob, updateData);

        await updateJob.save();

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}


// DELETE - Delete Job
export async function deleteJob(req, res) {
    try {
        const id = req.params.id //write what is pased in route of delete router
        if(!id){
            return res.status(404).json({
                message:"ID can't be access",
                success:false
            })
        }
        const deletejob = await Job.findByIdAndDelete(id);

        if (!deletejob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
            deletejob
        });
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
