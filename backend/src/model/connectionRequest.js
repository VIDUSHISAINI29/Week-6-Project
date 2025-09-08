// models/ConnectionRequest.js
import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
   {
      from: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      to: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true },
      status: {
         type: String,
         enum: ["pending", "accepted", "rejected", "ignored"],
         default: "pending",
      },
   },
   { timestamps: true }
);

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

export default ConnectionRequest;
