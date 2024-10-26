import mongoose from "mongoose";
import { replySchema } from "./repliesModel.js";
export const postSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        title:{
            type: String,
        },
        body:
        {
            type: String,
            required: true
        },
        replies: [replySchema]
    }
);
export const Post = mongoose.model('Post', postSchema)