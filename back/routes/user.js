import express from "express";
import User from "../schemas/User.js"
import {verifyTokenAndAuth,verifyToken,verifyTokenAndAdmin} from "./verifyToken.js";
const router=express.Router();

// find user by id-------------------------------
router.get('/:id',verifyTokenAndAuth,async (req, res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(user){
            res.status(200).send(user);
        }else{
            res.status(400).send("No user found");
        }
    }catch(e){
            res.status(500).send(e);
    }
})

//Find user by username------------------------------------
router.get("/find/:username",verifyToken,async (req,res)=>{
    try{
        const users=await User.aggregate([
            {$match:{username:{$regex:"(?i)^"+req.params.username}}},
            {$project:
                {
                    username:"$username",
                }
            }
        ])
        if(users) res.status(200).send(users);
        else res.status(400).send("No users found");
    }catch(e){
        res.status(500).send(e.message);
    }
})

//Add a following-------------------------------------------
router.put("/follow/:id",verifyToken,async (req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.user.id,{$push:{following:req.params.id}},{new:true});
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e.message);
    }
})



export default router