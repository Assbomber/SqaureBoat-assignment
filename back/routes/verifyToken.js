import jwt from "jsonwebtoken";

const verifyToken=(req,res,next)=>{
    const head=req.headers.token;
    if(head){
        const token =head.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err) res.status(400).send("Token is Invalid");
            req.user=user;
            next();
        })
    }else{
        res.status(400).send("You are not authenticated");
    }
}


const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin) next();
        else res.status(400).send("You are not allowed to access this page");
    })
}
const verifyTokenAndAuth=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin) next();
        else res.status(400).send("You are not allowed to access this page");
    })

}

export {verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin};