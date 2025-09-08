import User from '../model/user.js';
import Job from '../model/job.js';

//  ################### POST A JOB ###################


export const postJob = async(req, res) => {
    try {
        const {postedBy, title, description, skills} = req.body;
        const job = new Job({
            postedBy,
            title,
            description,
            skills
        });
        
        await job.save();
        res.status(200).json({job: job});
    } catch (error) {
        console.log("Error in post jobs controller", error);
        res.status(500).json({message: error.message});
    }
}


//  ################### GET ALL JOBS  ###################


export const getJobs = async(req, res) => {
    try {
        const jobs = await Job.find();
        if(!jobs){
            return res.status(400).json({message: "Jobs not found"});
        }
        res.status(200).json({jobs: jobs});
    } catch (error) {
        console.log("Error in get jobs controller", error);
        res.status(500).json({message: error.message});
    }
}


//  ################### APPLICATION FOR JOB ###################


export const applyForJob = async(req, res) => {
    try {
        const {jobId} = req.params;
        const {userId} = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                $push: {
                    applicants : {
                        user: userId,
                    }
                }
            }
        );

        if(!updatedJob){
            return res.status(400).json({message: "Job not found."});
        }

        res.status(200).json({
            message: "Successfully applied for job.",
            job: updatedJob
        })

    } catch (error) {
        console.log("Error in update job controller", error);
        res.status(500).json({message: error.message});
    }
}


//  ################### DELETE JOB BY ID ###################



export const deleteJob = async(req, res) => {
    try {
        const {jobId} = req.params;
        const deletedJob = await Job.find(jobId, {new : true});
        if(!deletedJob){
            return res.status(400).json({message: "Job not found"});
        }
        res.status(200).json({deletedJob: deletedJob});
    } catch (error) {
        console.log("Error in delete job controller", error);
        res.status(500).json({message: error.message});
    }
}



//  ################### GET ALL APPLICANTS FOR A PARTICULAR JOB ###################




export const getAllApplicantsForJob = async(req, res) => {
    try {
        const {jobId} = req.params;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({message: "Job not found"});
        }
        res.status(200).json({applicants: job.applicants});
    } catch (error) {
        console.log("Error in get all applicants for a particular job controller", error);
        res.status(500).json({message: error.message});
    }
}






