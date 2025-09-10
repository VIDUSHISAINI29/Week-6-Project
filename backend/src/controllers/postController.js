import Post from '../model/post.js'
import cloudinary from '../config/cloudinary.js'


//  ################### CREATE POST ###################


export const createPost = async (req, res) => {
  try {
    const { userId, content, image, video } = req.body;

    let newPostData = {
      userId,
      content,
    };

    // Upload image if provided
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      newPostData.image = uploadImage.secure_url;
    }

    // Upload video if provided
    if (video) {
      const uploadVideo = await cloudinary.uploader.upload(video, {
        resource_type: "video", // important for videos
      });
      newPostData.video = uploadVideo.secure_url;
    }


    // Save the new post
    const newPost = new Post(newPostData);
    await newPost.save();

    res.status(201).json({post : newPost});
  } catch (error) {
    console.error("Error in create post controller:", error);
    res.status(500).json({ message: error.message });
  }
};


//  ################### UPDATE POST ###################


export const updatePost = async(req, res) => {
    try {
        const {postId} = req.params;
        const {content} = req.body;

        const post = await Post.findByIdAndUpdate(postId, {content}, {new: true});

        if(!post) return res.status(404).json({message: "Post not found"});

        res.status(200).json({post: post});

    } catch (error) {
        console.error("Error in update post controller:", error);
    res.status(500).json({ message: error.message });
    }
}


//  ################### GET ALL POST ###################


export const getAllPosts = async(req, res) => {
    try {
        const allPosts = await Post.find().sort({ createdAt: -1 });
        if(!allPosts) return res.status(404).json({message: "No post found."});

        res.status(200).json({posts: allPosts});
    } catch (error) {
        console.error("Error in get all posts controller:", error);
    res.status(500).json({ message: error.message });
    }
}


//  ################### DELETE POST ###################


export const deletePost = async(req, res) => {
    try {
        const {postId} = req.params;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if(!deletedPost) return res.status(404).json({message: "Post not found"});

        res.status(200).json({deletedPost : deletedPost});

    } catch (error) {
        console.error("Error in delete post controller:", error);
    res.status(500).json({ message: error.message });
    }
}


//  ################### LIKE & COMMENT ON POST ###################


export const likeAndCommentOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, comment } = req.body;

    let updateQuery = {};

    // If userId is passed → Toggle like/unlike
    if (userId && !comment) {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.likes.includes(userId)) {
        // Unlike
        post.likes = post.likes.filter(id => id.toString() !== userId);
      } else {
        // Like
        post.likes.push(userId);
      }

      await post.save();
      return res.status(200).json({ post });
    }

    // If comment is passed → Add new comment
    if (comment && userId) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { comments: { userId, text: comment } }
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json({ post });
    }

    res.status(400).json({ message: "Invalid request. Provide userId for like/unlike or userId+comment to add a comment." });

  } catch (error) {
    console.error("Error in likeAndCommentOnPost controller:", error);
    res.status(500).json({ message: error.message });
  }
};

