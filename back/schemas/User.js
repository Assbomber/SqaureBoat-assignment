import mongoose from "mongoose";

const UserSchema =mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    isAdmin:{type:Boolean,default:false},
    following:{type:Array,default:[]}
})

export default mongoose.model("User",UserSchema);