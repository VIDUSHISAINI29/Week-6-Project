import User from "../model/user.js";
import Job from "../model/job.js";
import mongoose from 'mongoose'

//  ################### POST A JOB ###################

export const postJob = async (req, res) => {
   try {
      const {
         postedBy,
         company,
         location,
         title,
         description,
         skills,
         salary,
         jobType,
         workMode,
      } = req.body;

      // Create new job document
      const job = new Job({
         postedBy,
         company,
         location,
         title,
         description,
         skills,
         salary,
         jobType,
         workMode,
      });

      await job.save();

      res.status(201).json({
         success: true,
         message: "Job posted successfully",
         job,
      });
   } catch (error) {
      console.log("❌ Error in postJob controller:", error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

//  ################### GET ALL JOBS  ###################

export const getJobs = async (req, res) => {
   try {
      const jobs = await Job.find()
         .populate("postedBy", "name email profilePic")
         .limit(20);

      if (!jobs || jobs.length === 0) {
         return res.status(404).json({ message: "Jobs not found" });
      }

      res.status(200).json({ jobs });
   } catch (error) {
      console.log("Error in get jobs controller", error);
      res.status(500).json({ message: error.message });
   }
};

//  ################### APPLICATION FOR JOB ###################

export const applyForJob = async (req, res) => {
   try {
      const { jobId } = req.params;
      const { userId } = req.body;

      // Find the job
      const job = await Job.findById(jobId);
      if (!job) {
         return res.status(404).json({ message: "Job not found." });
      }

      // Check if user already applied
      const alreadyApplied = job.applicants.some(
         (applicantId) => applicantId.toString() === userId
      );

      if (alreadyApplied) {
         return res
            .status(400)
            .json({ message: "User already applied for this job." });
      }

      // Add userId to applicants array
      job.applicants.push(userId);
      await job.save();

      res.status(200).json({
         message: "Successfully applied for job.",
         job,
      });
   } catch (error) {
      console.log("Error in applyForJob controller", error);
      res.status(500).json({ message: error.message });
   }
};


//  ################### DELETE JOB BY ID ###################

export const deleteJob = async (req, res) => {
   try {
      const { jobId } = req.params;
      const deletedJob = await Job.find(jobId, { new: true });
      if (!deletedJob) {
         return res.status(400).json({ message: "Job not found" });
      }
      res.status(200).json({ deletedJob: deletedJob });
   } catch (error) {
      console.log("Error in delete job controller", error);
      res.status(500).json({ message: error.message });
   }
};

//  ################### GET ALL APPLICANTS FOR A PARTICULAR JOB ###################

export const getAllApplicantsForJob = async (req, res) => {
   try {
      const { jobId } = req.params;
      const job = await Job.findById(jobId);
      if (!job) {
         return res.status(400).json({ message: "Job not found" });
      }
      res.status(200).json({ applicants: job.applicants });
   } catch (error) {
      console.log(
         "Error in get all applicants for a particular job controller",
         error
      );
      res.status(500).json({ message: error.message });
   }
};

//  ################### GET ALL JOBS FOR PARTICULAR USER ###################



export const getJobsAppliedByUser = async (req, res) => {
  try {
    const { userId } = req.params;

   const jobs = await Job.find({ applicants: userId })
      .populate("postedBy", "name profilePic") // info of job poster
      .populate("applicants", "name profilePic"); // info of applicants

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No applied jobs found" });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    console.log("Error fetching jobs applied by user:", error);
    res.status(500).json({ message: error.message });
  }
};

