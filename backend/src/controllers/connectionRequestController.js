import cloudinary from '../config/cloudinary.js';
import User from '../model/user.js';
import ConnectionRequest from "../model/connectionRequest.js";
import {io, getUserSocketId} from "../config/socket.js";



//  ################### SEND A CONNECTION REQUEST ###################



export const sendConnectionRequest = async (req, res) => {
  try {
    // const fromUserId = req.user._id;
    const { toUserId, fromUserId } = req.body;

    if (fromUserId.toString() === toUserId) {
      return res.status(400).json({ message: "You cannot send a request to yourself." });
    }

    const user = await User.findById(fromUserId);

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "Target user not found." });
    }

      // ✅ Check if they are already connected
    if (user.connections.includes(toUserId)) {
      return res.status(400).json({ message: "You are already connected with this user." });
    }

    const existing = await ConnectionRequest.findOne({
      $or: [
        { from: fromUserId, to: toUserId },
        { from: toUserId, to: fromUserId }
      ]
    });

    if (existing) {
      return res.status(400).json({
        message: `A request already exists with status: ${existing.status}.`,
        existing
      });
    }

    const newRequest = await ConnectionRequest.create({
      from: fromUserId,
      to: toUserId,
      status: "pending"
    });

    // Real-time notification
    const receiverSocketId = getUserSocketId(toUserId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("connection-request", {
        from: fromUserId,
        request: newRequest
      });
    }

    res.status(200).json({ message: "Connection request sent.", request: newRequest, fromUser:user });
  } catch (err) {
    console.error("Error sending connection request:", err);
    res.status(500).json({ message: err.message });
  }
};



//  ################### RESPONSE TO REQUESTS ###################



export const respondToConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // "accepted" or "rejected"

    const request = await ConnectionRequest.findById(requestId);
    const user = await User.findById(request.to).populate("connections", "name profilePic");
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already handled" });
    }

    request.status = action;
    await request.save();

    if (action === "accepted") {
      await User.findByIdAndUpdate(request.from, { $addToSet: { connections: request.to } });
      await User.findByIdAndUpdate(request.to, { $addToSet: { connections: request.from } });

      // *** Real-time notification to the sender ***
      const senderSocketId = getUserSocketId(request.from);
      if (senderSocketId) {
        io.to(senderSocketId).emit("ConnectionRequestAccepted", {
          requestId: request._id,
          by: request.to, // user who accepted
        });
      }

        await request.deleteOne(); 

      res.json({ request: request, toUser: user });
    }

    if (action === "rejected") {
  await request.deleteOne();

  // Real-time notification to the sender
  const senderSocketId = getUserSocketId(request.from);
  if (senderSocketId) {
    io.to(senderSocketId).emit("ConnectionRequestRejected", {
      requestId,
      by: request.to,
    });
  }

  return res.json({ message: "Request rejected and deleted." });
}


  } catch (err) {
    console.error("Error responding to connection request", err);
    res.status(500).json({ message: err.message });
  }
};


//  ################### GET ALL CONNECTIONS ###################



export const getUserConnections = async (req, res) => {
  try {
    
    const {userId} = req.params;

    // Find the user and populate the connections field
    const user = await User.findById(userId).populate("connections", "name profilePic"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ connections: user.connections });
  } catch (error) {
    console.error("Error fetching connections controller", error);
    res.status(500).json({ message: error.message });
  }
};



//  ################### GET ALL CONNECTION REQUESTS ###################




export const getConnectionRequests = async (req, res) => {
  try {
    
    const {userId} = req.params; // assuming you added this in middleware (auth)
    // Find the user and populate the connections field
    const requests = await ConnectionRequest.find({ to: userId, status: "pending" })
    .populate("from", "name email profilePic")  // populate sender
      .populate("to", "name email profilePic");   // populate receiver
      
    if (!requests) {
      return res.status(404).json({ message: "requests not found" });
    }
    
    res.status(200).json({ requests: requests });
  } catch (error) {
    console.error("Error get requests controller", error);
    res.status(500).json({ message: error.message });
  }
};



//  ################### GET SENT CONNECTION REQUESTS ###################



export const getSentRequests = async (req, res) => {
  try {
    
    const {userId} = req.params; // assuming you added this in middleware (auth)
    // Find the user and populate the connections field
    const requests = await ConnectionRequest.find({ from: userId, status: "pending" })
    .populate("from", "name email profilePic")  // populate sender
    .populate("to", "name email profilePic");   // populate receiver
    
    if (!requests) {
      return res.status(404).json({ message: "requests not found" });
    }
    
    res.status(200).json({ requests: requests });
  } catch (error) {
    console.error("Error get sent requests controller", error);
    res.status(500).json({ message: error.message });
  }
};



//  ################### DELETE REQUEST ###################



export const deleteRequest = async (req, res) => {
  try {
    
    const {requestId} = req.params; // assuming you added this in middleware (auth)
    // Find the user and populate the connections field
    const requests = await ConnectionRequest.findByIdAndDelete(requestId, {new: true});

    if (!requests) {
      return res.status(404).json({ message: "requests not found" });
    }
    
    res.status(200).json({ requests: requests });
  } catch (error) {
    console.error("Error delete controller", error);
    res.status(500).json({ message: error.message });
  }
};


