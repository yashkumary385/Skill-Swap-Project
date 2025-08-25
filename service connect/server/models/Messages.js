import mongoose, { Schema } from "mongoose"
 const MessageSchema = new mongoose.Schema(
    { // dont need a reciver because chat schema users array know the two users .
        sender:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        content:{
            type:String,
            required:true
        },
        chatId:{
            type:Schema.Types.ObjectId,
            ref:"Chat"
          
        },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        timestamp: { type: Date, default: Date.now }
    }
)
export default mongoose.model("Message",MessageSchema)
