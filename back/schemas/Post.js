import mongoose from 'mongoose';

const PostSchema =mongoose.Schema({
    id:{type:String, required:true},
    username:{type:String,required:true},
    title:{type:String,required:true},
    desc:{type:String,required:true},
},{timestamps:true})

export default mongoose.model('Post',PostSchema);