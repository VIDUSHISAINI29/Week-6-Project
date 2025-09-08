import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
    }
}, 
    {
        timestamps: true
    }
);

const postSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type : String,
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
        message: "Image must be a valid URL",
      },
    },
    likes: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments : [commentSchema],
}, 
    {
        timestamps: true,
    });

const Post = mongoose.model("Post", postSchema);

export default Post;