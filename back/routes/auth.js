import express from 'express';
import crypto from "crypto-js";
import User from "../schemas/User.js";
import jwt from "jsonwebtoken";
const router =express.Router();

//Register---------------------------------------------
router.post("/register",async (req,res)=>{
    const user=new User({
        username: req.body.username,
        email:req.body.email,
        password:crypto.AES.encrypt(req.body.password,process.env.ENCRYPT_KEY).toString(),
    });

    try{
        const newUser=await user.save();
        res.status(200).send(newUser);
    }catch(e){
        res.status(500).send(e.message);
    }
});


//Login------------------------------------------------------------------------------------------
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user) res.status(400).send("No such user found");
        const decryptedPass=crypto.AES.decrypt(user.password,process.env.ENCRYPT_KEY).toString(crypto.enc.Utf8);
         if(decryptedPass===req.body.password){
             const {password,...others}=user._doc;
             const token=jwt.sign({
                 id:user.id,
                 isAdmin:user.isAdmin,
             },process.env.JWT_KEY,{expiresIn:"3d"});
             res.status(200).send({...others,token});
         }else res.status(400).send("Wrong password");
    }catch(e){
        res.status(500).send(e.message);
    }
});

export default router;