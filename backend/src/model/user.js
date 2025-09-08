import mongoose from "mongoose";

const experienceOfUserSchema = new mongoose.Schema({
   company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
   },
   role: {
      type: String,
      required: true,
   },
   from: {
      type: Date,
      required: [true, "Start date is required."],
   },
   to: {
      type: Date,
   },
});

const educationOfUserSchema = new mongoose.Schema({
   college: {
      type: String,
      required: [true, "College/School is required"],
      trim: true,
   },
   degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
   },
   from: {
      type: Date,
      required: [true, "Start date is required"],
   },
   to: {
      type: Date,
   },
});

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Name is required"],
         trim: true,
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      },
      password: {
         type: String,
         required: [true, "Password is required"],
         minlength: [6, "Password must be at least 6 characters long"],
      },
      bio: {
         type: String,
         maxlength: [200, "Bio cannot exceed 200 characters"],
      },
      profilePic: {
         type: String,
         validate: {
            validator: function (v) {
               // allow empty or must be a valid URL
               return !v || /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: "Profile picture must be a valid URL",
         },
      },
      banner: {
         type: String,
         validate: {
            validator: function (v) {
               // allow empty or must be a valid URL
               return !v || /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: "Profile picture must be a valid URL",
         },
      },
      experience: [experienceOfUserSchema],
      education: [educationOfUserSchema],
      skills: {
         type: [String],
         default: [],
      },
      connections: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
         },
      ],
      connectionRequests: [
         
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
            },
      ],
      // Saved jobs - referencing a Job model (assumption)
      // savedJobs: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Job",
      //   },
      // ],
   },
   {
      timestamps: true,
   }
);

const User = mongoose.model("User", userSchema);

export default User;
