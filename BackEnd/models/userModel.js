import mongoose from "mongoose"; //Mongoose library used to create the documents in the database
import { classSchema } from "./classModel.js"; // Import class schema as it is used in the userSchema
import { messageListSchema } from "./messageListModel.js"; // Import the messageListSchema as it is used in the userSchema
import {postSchema} from './postModel.js';

const userSchema = new mongoose.Schema(
{
    userName: // Name of field in database
    {
        type: String, // how the field will be stored datawise
        required: true
    },
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true, // if the field is required (optional)
        unique: true // if the field must be unique (optional)
    },
    password:
    {
        type: String,
        required: true
    },
    gradeLevel:
    {
        type:String,
        required: true
    },
    onBoarded:
    {
        type: Boolean,
        required: true
    },
    classes: [classSchema], // Field will be stored as an array with the other schema
    messages: [messageListSchema],
    posts: [postSchema]

});

export const user = mongoose.model("User", userSchema); // model provides the database with an interface to perform all CRUD (Created, read, update, delete) operations.