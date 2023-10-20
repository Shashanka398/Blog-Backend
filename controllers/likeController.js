const Post=require("../models/postModel") ;
const Like=require("../models/likeModel");


exports.likePost=async(req,res)=>{
    try{
        const {post,user}=req.body;
        const like=new Like({
            post,user
        });
        const savedLiked=await like.save();

        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLiked._id}},{new:true});
        res.json({
            post:updatedPost
        })
    }
    catch(error)
    {
        console.error(error)
        return res.status(400).json({
            error: "Error while liking post",

        });

    }

}


exports.unlikePost=async(req,res)=>{
    try{
        const {post,like}=req.body;
        const deletedLike=await Like.findByIdAndDelete({Post:post,_id:like});

        //updated delete post collection
        const updatedPost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});
        res.json({
            post:updatedPost
        })

        
    }
    catch(error)
    {
        console.error(error);
        return res.status(400).json({
            error: "Error while unliking post",

        });
    }

}