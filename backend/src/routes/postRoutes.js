import {Router} from "express";

import {createPost, updatePost, getAllPosts, deletePost, likeAndCommentOnPost} from "../controllers/postController.js";

const router = Router();

router.post('/create-post', createPost);
router.put('/edit-post/:postId', updatePost);
router.get('/all-posts', getAllPosts);
router.delete('/delete-post/:postId', deletePost);
router.put('/add-likes-on-post/:postId', likeAndCommentOnPost);

export default router;