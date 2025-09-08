import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title: {
        type: String,
        maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
        type: String
    },
    skills: {
        type: [String],
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // applicant is a User
          required: true,
        },
        appliedAt: {
          type: Date,
          default: Date.now, // automatically stores when they applied
        },
      },
    ],
}, 
    {
        timestamps: true
    });

const Job = mongoose.model("Job", jobSchema);

export default Job;