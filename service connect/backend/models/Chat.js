import mongoose, { Schema } from "mongoose";
import SwapService from "./SwapService.js";
import User from "./User.js";

 const MessageSchema = new mongoose.Schema(
    { // dont need a reciver because chat schema users array know the two users .
        sender:{
            type:Schema.Types.ObjectId,
            ref:User,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        timestamp: { type: Date, default: Date.now }
    }
)

 const ChatSchema = new mongoose.Schema(
    {
        swapId:{
            type:Schema.Types.ObjectId,
            ref:SwapService,
        },
        users:[
            {
                type:Schema.Types.ObjectId,
                ref:User
            }
        ],
        messages:[MessageSchema],
        createdAt: { type: Date, default: Date.now }
    }
)

export default mongoose.model("Chat",ChatSchema)

// export default mongoose.model("Notification",notificationSchema)
