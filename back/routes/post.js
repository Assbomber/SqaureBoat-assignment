import express from "express";
import Post from "../schemas/Post.js"
import User from "../schemas/User.js";
import {verifyTokenAndAuth,verifyToken,verifyTokenAndAdmin} from "./verifyToken.js";
const router=express.Router();

//get my posts-----------------------------------------
router.get("/feed",verifyToken,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        const following=user.following;
        
        const posts=await Post.find({id:{$in:[...following,req.user.id]}});
        res.status(200).send(posts);
    }
    catch(e){
        res.status(500).send(e.message);
    }
})


// add-------------------------------
router.post('/',verifyToken,async (req, res)=>{
    try{
        const post=new Post({
            id:req.user.id,
            username:req.body.username,
            title:req.body.title,
            desc:req.body.desc,
        })
        const newPost=await post.save();
        res.status(200).send(newPost);
    }catch(e){
            res.status(500).send(e.message);
    }
})

// delete post by id--------------------------------------
router.delete("/:id",verifyToken,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post){
            if(req.user.id===post.id){
                await post.remove();
                res.status(200).send("Post has been removed");
            }else{
                res.status(400).send("Permission denied");
            }
        }else res.status(400).send("Post not found");
    }catch(e){
        res.status(500).send(e.message);
    }
})
// //Find user by username------------------------------------
// router.get("/find/:username",verifyToken,async (req,res)=>{
//     try{
//         const users=await User.aggregate([
//             {$match:{username:{$regex:"(?i)^"+req.params.username}}},
//             {$project:
//                 {
//                     username:"$username",
//                 }
//             }
//         ])
//         if(users) res.status(200).send(users);
//         else res.status(400).send("No users found");
//     }catch(e){
//         res.status(500).send(e.message);
//     }
// })

// //Add a following-------------------------------------------
// router.put("/follow/:id",verifyToken,async (req,res)=>{
//     try{
//         const user=await User.findByIdAndUpdate(req.user.id,{$push:{following:req.params.id}},{new:true});
//         res.status(200).send(user);
//     }catch(e){
//         res.status(500).send(e.message);
//     }
// })



export default router