const express= require("express");
const router =express.Router();

const {createComment} =require("../controllers/commentcontroller");
const {likePost,unlikePost}=require("../controllers/likeController");
const {createPost,getAllPosts,deletePost}=require("../controllers/postController");

router.post("/posts/create",createPost);
router.get("/posts/allPosts",getAllPosts);
router.post("/comments/create",createComment);
router.delete("/posts/delete/:id",deletePost);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);


module.exports=router;