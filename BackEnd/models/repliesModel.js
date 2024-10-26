import mongoose from "mongoose";
export const replySchema = new mongoose.Schema(
    {
        userName: 
        {
            type: String,
        },
        body:
        {
            type: String
        }
    }
);

export const Reply = mongoose.model('Reply', replySchema);