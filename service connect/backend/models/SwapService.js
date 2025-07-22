import mongoose from "mongoose"
import { Schema } from "mongoose"
const swapSchema = new mongoose.Schema({
    requester:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    recepient:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    requesterService:{
        type:Schema.Types.ObjectId,
        ref:'Service',
        required:true
    },
    recepientService:{
         type:Schema.Types.ObjectId,
        ref:'Service',
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"] ,
        default:"pending"
    }
},{ strictPopulate: false })
export default mongoose.model("Swap",swapSchema)