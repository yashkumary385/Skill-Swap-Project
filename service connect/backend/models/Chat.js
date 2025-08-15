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

// // 🚀 Always delete before recreating
// if (mongoose.connection.models['Chat']) {
//   delete mongoose.connection.models['Chat'];
// }

export default mongoose.model("Chat", ChatSchema);
