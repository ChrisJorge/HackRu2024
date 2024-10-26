// Import the necessary libraries 
import express from "express"; // Used to create the server
import cors from "cors"; // Used for secure data transfer and requests between servers and browsers

// Import necessary functions 
import { connectToDataBase } from "./connection.js"; //Function to connect to DataBase
import { CreateAccount, LogIn, RetrieveUserData, UploadCompletedClasses, fetchAllUsers, fetchConversation, updateConversation } from "./controllers/userController.js";
import { DeleteClass, ModifyTutorClass } from "./controllers/ClassController.js";
import { createPost, fetchPosts, createReply } from "./controllers/PostController.js";
const server = express(); // Initialize the server with a variable using the express library
const port = 3000; // Initalize a variable for the port number the backend server will run on

let clients = []

export const  sendEventsToAll = (data) => {
    console.log('we inside sendEventsToAll')
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`));
  };

// Initialize necessary middleware
server.use(cors()); // Allows server to retrieve and post data
server.use(express.json()); //Middleware that parses incoming json requests

server.get('/login/:email', RetrieveUserData);
server.get('/feed/posts', fetchPosts);
server.get('/users', fetchAllUsers)
server.get('/messages/:uid/:mid', fetchConversation)
server.get('/events', (req,res) => {
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient);

    res.write(`data: ${JSON.stringify({ message: 'Connected' })}\n\n`);

    req.on('close', () => {
        clients = clients.filter(client => client.id !== clientId);
      });
})

server.post('/login', LogIn);
server.post('/', CreateAccount);
server.post('/feed/posts', createPost);
server.post('/feed/posts/reply', createReply);
server.post('/uploadClasses', UploadCompletedClasses);
server.post('/messages', updateConversation)

server.patch('/profile/:userid/:classid/:tutoring', ModifyTutorClass);
server.delete('/profile/:userid/:classid', DeleteClass);

server.listen(port, () => { // Launch the server
    console.log(`Server running on port: ${port}`);
});

connectToDataBase(); //Running the function that initializes a connection to the database