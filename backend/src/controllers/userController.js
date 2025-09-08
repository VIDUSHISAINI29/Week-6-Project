import cloudinary from '../config/cloudinary.js';
import User from '../model/user.js';


//  ################### GET ALL USERS ###################


export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users: users});
    } catch (error) {
        console.log("Error in get users controller", error);
        res.status(500).json({message: error.message});
    }
}



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







