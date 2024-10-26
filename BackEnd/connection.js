// Import the necessary libraries 
import dotenv from "dotenv"; // dotenv is used to access the environment variables 
import mongoose from "mongoose"; // Mongoose is used to connect to the mongoDB client
dotenv.config(); // Load the environment variables
const password = process.env.DB_PASSWORD; // Initialize a variable with the .env database password
const user = process.env.DB_USER; // Initialize a variable with the .env database user
export const connectToDataBase = async () => { // function to connect with DataBase
    await mongoose.connect(`mongodb+srv://${user}:${password}@contentcluster.eholk.mongodb.net/?retryWrites=true&w=majority&appName=ContentCluster`);
    console.log('Connected To MongoDB cluster');
};

