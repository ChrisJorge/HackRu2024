import {user as User} from '../models/userModel.js';

export const DeleteClass = async(req,res) => {
    const UserID = req.params.userid
    const classID = req.params.classid;
    
    let user = await User.findById(UserID)
    if (user)
    {
        for(let i = 0; i < user.classes.length; i++)
        {
            if(user.classes[i]._id == classID)
            {
                user.classes.splice(i,1);
                await user.save();
                break;
            }
        }
        return res.sendStatus(200)
    }
    else
    {
        return res.sendStatus(404)
    }
}

export const ModifyTutorClass = async(req,res) => {
    const UserID = req.params.userid;
    const ClassID = req.params.classid;
    const tutoring = req.params.tutoring
    const user = await User.findById(UserID);
    if(user)
    {
        for(let i = 0; i < user.classes.length; i++)
        {
            if(user.classes[i]._id == ClassID)
            {
               user.classes[i].tutoring = tutoring;
               await user.save();
               break;
            }
        };
        return res.sendStatus(200);
    }else{
        return res.sendStatus(404); //Send a 404 to indicate user was not found
    }
}

export const addEnrolledClass = async (req,res) => {

}