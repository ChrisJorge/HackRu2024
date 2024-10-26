import { messageListSchema } from '../models/messageListModel.js';
import {user as User} from '../models/userModel.js'; // Import the user model so that we can create the CRUD methods
import bcrypt from "bcrypt"; // Password hashing algorithm

export const CreateAccount = async (req,res) => {
    try{
        const {Name,Email,Year, Password} = req.body;
        const hashedPassword = bcrypt.hashSync(Password,10); // Encrypt the password
        let uName = '' // Variable for the user name which is derived from the students email
        for(let i = 0; i < Email.length; i ++)
        {
            if(Email[i] == '@') // Check if the current index in the string is equal to the @ symbol
            {
                break; // If so break out of the loop
            }
            else
            {
                uName += `${Email[i]}`; // Add all characters before the @ into the string
            }
        };
        const newUser = await User.create({ // Create the user and add them to the database
            userName: uName,
            name: Name,
            email: Email,
            password: hashedPassword,
            gradeLevel: Year,
            onBoarded: false,
            classes: [],
            messages: []
        });
        console.log('New User Created Successfully!');
        return res.sendStatus(200); //Send a 200 Ok status message to indicate the account has successfully been created
    } catch(error)
    {
        console.log(error)
        if(error.code === 11000){
            res.statusMessage = "An account already exists with that email"
            return res.sendStatus(400); // Send a status code of 400 if an account already exists with the entered email
        }
        return res.sendStatus(401); // Send a status code 401 for any other issues
    };
};

export const LogIn = async(req,res) => {
    const{email, Password} = req.body;
    const user = await User.findOne({email});
    console.log('User found')
    if(!user) // Check if the user does not exist
    {
        console.log('Could Not Find User');
        return res.sendStatus(401); // return a 401 status code if the user does not exist in the database
    }
    const validatePassword = bcrypt.compareSync(Password, user.password); // Compare the encrypted password to the password entered by the user
    if(!validatePassword) // Check if the password is not the same
    {
        console.log('Passwords do not match');
        return res.sendStatus(401); // return a 401 status code if the passwords do not match
    } 
    console.log('Passwords Match, User signed in');
    return res.sendStatus(200); // return a 200 status code if the passwords do match
    
}

export const RetrieveUserData = async(req,res) => {
    const email = req.params.email;
    console.log(`Retrieving info for user with email ${email}`);
    const user = await User.findOne({email});
    // console.log(user)
    res.json({user: user})
}

export const UploadCompletedClasses = async(req,res) => {
 const {user, CompletedClassArr, EnrolledClassArr} = req.body;
 let email = user.email;
 const classes = CompletedClassArr.concat(EnrolledClassArr); // Combine both of the arrays
//  console.log(classes)
 const Updateduser = await User.findOneAndUpdate({email},{
    userName: user.userName,
    name: user.name,
    email: user.email,
    password: user.passwor,
    gradeLevel: user.gradeLevel,
    onBoarded: true,
    classes: classes,
    messages: user.messages
 })
 res.sendStatus(200)
}

export const fetchAllUsers = async(req,res) => {
    const users = await User.find();
    res.json({users: users})
}


export const fetchConversation = async(req,res) => {
    console.log('fetching the conversation')
    const uid = req.params.uid;
    const mid = req.params.mid
    const user = await User.findById(uid)
    const userBeingMessaged = await User.findById(mid)
    let found = false
    console.log(user.userName)
    console.log(userBeingMessaged.userName)
    if(user.messages.length > 0 && userBeingMessaged)
    {
        console.log('both users found')
        for(let i = 0; i < user.messages.length; i++)
        {
           console.log(user.messages[i].name + ' ' +  userBeingMessaged.userName)
           if(user.messages[i].name == userBeingMessaged.userName)
           {
            found = true
            console.log(user.messages[i])
            console.log(user.messages[i].messages)
            res.json({messageList: user.messages[i].messages})
            break;
           }
        }
        if(user.messages.length == 0 || found == false)
        {
            res.json({messageList: []})
        }
    }
    else{
        res.json({messageList: []})
    }
}

export const updateConversation = async(req,res) => {
    const {message, userMessaging, userBeingMessaged} = req.body;
    console.log(message, userMessaging, userBeingMessaged);
    const user = await User.findById(userMessaging);
    const usermessaged = await User.findById(userBeingMessaged)
    let userFound = false
    let userMessagedFound = false
     const data = {
        UserName: user.userName,
        message: message
    };
    console.log(user.userName, usermessaged.userName)
    if(user && usermessaged)
    {
        for(let i = 0; i < user.messages.length; i++)
        {
            if(user.messages[i].name == usermessaged.userName)
            {
                console.log('Conversation found')
                userFound = true
                user.messages[i].messages.push(data);
                user.messages[i].recentMessage = data.message;
                await user.save();
                break;
            };
        };
        for(let i = 0; i < usermessaged.messages.length; i++)
        {
            if(usermessaged.messages[i].name == user.userName)
            {
                console.log('Conversation found')
                userMessagedFound = true
                usermessaged.messages[i].messages.push(data);
                usermessaged.messages[i].recentMessage = data.message;
                await usermessaged.save();
                break;
            }
        }
    }

    if(userFound == false && userMessagedFound == false)
    {
        console.log('couldnt find conversation, adding one to both people')
        const obj1 = {
            name: usermessaged.userName,
            recentMessage: message,
            messages: [data]
        }

        const obj2 = {
            name: user.userName,
            recentMessage: message,
            messages: [data]
        }

        user.messages.push(obj1);
        await user.save();
        usermessaged.messages.push(obj2);
        await usermessaged.save();
        console.log('All good')
    }
    else if(userFound == false)
    {
        const obj1 = {
            name: usermessaged.userName,
            recentMessage: message,
            messages: [data]
        }

        user.messages.push(obj1);
        await user.save();
    }
    else if(userMessagedFound == false)
    {
        usermessaged.messages.push(obj2);
        await usermessaged.save();
        const obj2 = {
            name: user.userName,
            recentMessage: message,
            messages: [data]
        } 
    }
    
}