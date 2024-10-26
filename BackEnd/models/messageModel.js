import mongoose from "mongoose";  //Mongoose library used to create the documents in the database
export const messageSchema = new mongoose.Schema( //The schema defines the structure of documents (data) in mongoDB
{
    UserName: //Name of field in database
    {
        type: String,  //How the field will be stored data wise
        required: true
    },
    message:
    {
        type: String,
        required: true
    }
});

export const Message = mongoose.model('Message', messageSchema);  // model provides the database with an interface to perform all CRUD (Created, read, update, delete) operations.