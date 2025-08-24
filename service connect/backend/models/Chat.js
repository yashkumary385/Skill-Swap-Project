import mongoose, { Schema } from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    swapId: {
      type: Schema.Types.ObjectId,
      ref: "SwapService",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: { type: Date, default: Date.now },
  }
);


export default mongoose.model("Chat", ChatSchema);
