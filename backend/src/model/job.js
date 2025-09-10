import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  postedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  company: {
    type: String,
    required: true
  },
  location:{
    type : String,
    requried: true
  },
  title: {
    type: String,
    maxlength: [200, "Title cannot exceed 200 characters"],
    required: [true, "Job title is required"],
  },
  description: {
    type: String,
    required: [true, "Job description is required"],
  },
  skills: {
    type: [String],
  },
  salary: {
    min: {
      type: Number,
      // required: true,
    },
    max: {
      type: Number,
      // required: true,
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  workMode: {
    type: String,
    enum: ["remote", "onsite", "hybrid"],
    required: true,
  },
  applicants: [
  
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // applicant is a User
        required: true,
      }
    
  ],
},
{
  timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
