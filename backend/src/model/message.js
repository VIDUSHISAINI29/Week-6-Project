import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
    },
    image: {
          type: String,
        validate: {
        validator: function (v) {
          // allow empty or must be a valid URL
          return !v || /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Image must be a valid URL",
      },
    },
    video: {
          type: String,
        validate: {
        validator: function (v) {
          // allow empty or must be a valid URL
          return !v || /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Video must be a valid URL",
      },
    }
},
    {
        timestamps:true
    });

const Message = mongoose.model("Message", messageSchema);

export default Message;