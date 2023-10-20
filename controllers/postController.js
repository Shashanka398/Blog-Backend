const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title,
            body
        });
        const savedPost = await post.save();
        res.json({
            post: savedPost,
        });
    } catch (error) {
        return res.status(400).json({
            error: "Error while creating"
        });
    }
}


exports.getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("comments").populate("likes").exec();
        res.json({
            posts,
        })
    }
    catch(error) {
        console.error(error)
        return res.status(400).json({
            error: "Error while fetching post",

        });
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: `Post with id ${id} not found.`,
            });
        }

        res.status(200).json({
            success: true,
            message: `Post with id ${id} deleted successfully`,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message,
        });
    }
}
