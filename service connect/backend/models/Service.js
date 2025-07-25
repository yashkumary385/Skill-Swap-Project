import mongoose, { Types } from "mongoose"
import User from "../models/User.js";

const serviceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    type:{
        "type":String,
        enum:["offer","request"] ,default :"request",
        required:true
    },
    cateogory:{
        type:String,
        default:"genreal"
    },
   
    email:{
        type:String,
        required:false
    }
},
{timestamps:true})

export default mongoose.model("Service",serviceSchema)