import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"; 
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());


//Mongodb connect------------------------------------------------------------------------------------------------
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Successfully connected to DB"))
.catch((e)=>console.log(e.message));

//Routes------------------------------------------------------
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/post",postRoute);

app.listen(process.env.PORT || 8000,()=>{
    console.log("Server up and running on port 8000");
})