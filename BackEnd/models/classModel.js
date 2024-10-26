import mongoose from "mongoose"; //Mongoose library used to create the tables in the database
export const classSchema = new mongoose.Schema( //The schema defines the structure of documents (data) in mongoDB
{
    courseName: //Name of field in database
    {
        type: String, //How the field will be stored data wise
        required: true // If field is required (optional)
    },
    courseNum:
    {
        type:String,
        required: true
    },
    grade:
    {
        type:String,
        required: true
    },
    inProgress:{
        type: Boolean,
        required: true
    },
    tutoring:{
        type: Boolean,
        required: true
    }
});

export const Class = mongoose.model('Class', classSchema); // model provides the database with an interface to perform all CRUD (Created, read, update, delete) operations.