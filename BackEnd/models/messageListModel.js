import mongoose from "mongoose"; //Mongoose library used to create the documents in the database
import { messageSchema } from "./messageModel.js"; // Import the message schema as it is used in the messageList schema
export const messageListSchema = new mongoose.Schema({ //The schema defines the structure of documents (data) in mongoDB
    name: //Name of field in database
    {
        type: String  //How the field will be stored data wise
    },
    recentMessage:
    {
        type: String
    },
    messages: [messageSchema]  
});

export const MessageList = mongoose.model('MessageList', messageListSchema);  // model provides the database with an interface to perform all CRUD (Created, read, update, delete) operations.