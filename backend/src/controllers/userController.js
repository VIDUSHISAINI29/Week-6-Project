import mongoose from 'mongoose';
import cloudinary from '../config/cloudinary.js';
import User from '../model/user.js';
import ConnectionRequest from '../model/connectionRequest.js';

//  ################### GET ALL USERS ###################


export const getUsers = async (req, res) => {
  try {
    const users = await User.aggregate([{ $sample: { size: 20 } }]); 
    // size: 20 → number of docs to fetch (change as needed)
    
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in get users controller", error);
    res.status(500).json({ message: error.message });
  }
};




//  ################### GET ALL USERS ###################



export const getUserById = async(req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId);
    res.status(200).json({user: user});
  } catch (error) {
    console.log("Error in get user by id controller", error);
        res.status(500).json({message: error.message});
      }
    }

    
    
    //  ################### UPDATE USER PROFILE ###################
    
    

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profilePic, banner, skills, bio, education, experience } = req.body;
    
    let updateFields = {};
    let updateQuery = {};
    
    // Profile picture upload
    if (profilePic) {
      const uploadImage = await cloudinary.uploader.upload(profilePic);
      updateFields.profilePic = uploadImage.secure_url;
    }
    if (banner) {
      const uploadImage = await cloudinary.uploader.upload(banner);
      updateFields.banner = uploadImage.secure_url;
    }

    // Normal fields (replace directly)
    if (bio) updateFields.bio = bio;
    if (skills) updateFields.skills = skills;
    
    // Build $set part of query
    if (Object.keys(updateFields).length > 0) {
      updateQuery.$set = updateFields;
    }

    if (education && education.length > 0) {
      updateQuery.$push = {
        ...(updateQuery.$push || {}),
        education: { $each: education },
      };
    }
    
    if (experience && experience.length > 0) {
      updateQuery.$push = {
        ...(updateQuery.$push || {}),
        experience: { $each: experience },
      };
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(userId, updateQuery, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log("Error in update user profile controller", error);
    res.status(500).json({ message: error.message });
  }
};



//  ################### GET USERS FOR SIDEBAR ###################



export const allLoggedInUsers = async(req, res) =>{
  try {
        const {loggedInUserId} = req.body;
        const filteredUsers = await User.find({_id : {$ne: loggedInUserId}}).select("-password");
        
        res.status(200).json(filteredUsers);
      } catch (error) {
        console.log("Error in getUser for side bar controller", error.message);
        res.status(500).json({message : error.message });
      }
    }
    

    
    //  ################### GET PEOPLE TO CONNECT ###################



    export const getPeopleToConnect = async (req, res) => {
    try {
    const {loggedInUserId} = req.params; // assuming you added this in middleware (auth)
    
    // 1. Get logged-in user's connections
    const loggedInUser = await User.findById(loggedInUserId).select("connections");

    
    // 2️⃣ Get all pending connection requests involving logged-in user
    const pendingRequests = await ConnectionRequest.find({
      $or: [{ from: loggedInUserId }, { to: loggedInUserId }],
      status: "pending",
    }).select("from to");

     const excludeIds = [
      new mongoose.Types.ObjectId(loggedInUserId),   // exclude self
      ...loggedInUser.connections.map((id) => new mongoose.Types.ObjectId(id)),
      ...pendingRequests.flatMap((req) => [ req.to, req.from]) // exclude connections
    ];

    // 2. Fetch only users not in excludeIds
    const users = await User.aggregate([
      { $match: { _id: { $nin: excludeIds } } },
      { $sample: { size: 20 } } // pick random 20
    ]);

    res.status(200).json({ users: users });
  } catch (error) {
    console.error("Error in get users controller", error);
    res.status(500).json({ message: error.message });
  }
};





