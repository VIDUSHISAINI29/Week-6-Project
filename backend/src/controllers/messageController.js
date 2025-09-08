import Message from "../model/message.js";
import { getUserSocketId, io } from "../config/socket.js";
import cloudinary from "../config/cloudinary.js";


//  ################### SEND MESSAGE ###################


export const sendMessage = async(req, res) => {
    try {
        const {content, image, video, senderId} = req.body;
        const {receiverId} = req.params;
        // const {senderId} = req.user._id;

        const fieldsForMessage = {};

        if(senderId) fieldsForMessage.senderId = senderId
        if(receiverId) fieldsForMessage.receiverId = receiverId
        if(content) fieldsForMessage.content = content;
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image);
            fieldsForMessage.image = uploadImage.secure_url;
        }
           // Upload video if provided
        if (video) {
          const uploadVideo = await cloudinary.uploader.upload(video, {
            resource_type: "video", // important for videos
          });
          fieldsForMessage.video = uploadVideo.secure_url;
        }

        const newMessage = new Message(fieldsForMessage);
        await newMessage.save();


        // **** real time functionality *****

        const receiverSocektId = getUserSocketId(receiverId);
        if(receiverSocektId){
            io.to(receiverSocektId).emit("New message", newMessage)
        }
        res.status(200).json({messages: newMessage})
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in send Messages controller",error);
    }
}


//  ################### GET MESSAGES ###################


export const getMessages = async(req, res) => {
    try {
        const {receiverId: userToChatId} = req.params;
        const{myId} = req.body;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ],
        });

        res.status(200).json({messages: messages});

    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in get Messages controller",error);
    }
}


//  ################### GET ALL MESSAGES ###################



export const getAllMessages = async(req, res) => {
    try {
        const allMessages = await Message.find();

        if(!allMessages){
            return res.status(404).json({message: "Messages not found"});
        }
        res.status(200).json({Messages: allMessages});
    } catch (error) {
         res.status(500).json({message: error.message})
        console.log("Error in delete Messages controller",error);
    }
}



//  ################### DELETE MESSAGE ###################


export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    // ***** Real-time functionality *****
    const { receiverId, senderId } = deletedMessage;  // get from deleted message
    const receiverSocketId = getUserSocketId(receiverId);
    const senderSocketId = getUserSocketId(senderId);

    // Notify both sender & receiver that a message has been deleted
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("Message deleted", { messageId });
    }
    if (senderSocketId && senderSocketId !== receiverSocketId) {
      io.to(senderSocketId).emit("Message deleted", { messageId });
    }

    res.status(200).json({ deletedMessage });

  } catch (error) {
    console.log("Error in delete Messages controller", error);
    res.status(500).json({ message: error.message });
  }
};



//  ################### UPDATE MESSAGE ###################



export const updateMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { newContent } = req.body;  // you can also allow updating images, etc.

    // Update message
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content: newContent },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    // ***** Real-time functionality *****
    const { receiverId, senderId } = updatedMessage;
    const receiverSocketId = getUserSocketId(receiverId);
    const senderSocketId = getUserSocketId(senderId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("Message updated", updatedMessage);
    }
    if (senderSocketId && senderSocketId !== receiverSocketId) {
      io.to(senderSocketId).emit("Message updated", updatedMessage);
    }

    res.status(200).json({ updatedMessage });

  } catch (error) {
    console.log("Error in update Messages controller", error);
    res.status(500).json({ message: error.message });
  }
};

