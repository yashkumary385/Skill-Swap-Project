import mongoose, { Schema } from "mongoose"
const notificationSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    message:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    },
    isCreated:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})
export default mongoose.model("Notification",notificationSchema)