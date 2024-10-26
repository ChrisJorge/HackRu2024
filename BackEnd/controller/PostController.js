import {user as User} from '../models/userModel.js';
import { Post } from '../models/postModel.js'
import { sendEventsToAll } from '../server.js';
export const createPost = async(req,res) => {
    try{
        const{UserID, PostTitle, PostBody} = req.body;
        const user = await User.findById(UserID);
        const newPost = await Post.create({
            userName: user.userName,
            title: PostTitle,
            body: PostBody,
            replies: []
        })
        console.log('Post created')
        if(user)
        {
            user.posts.push(newPost);
            await user.save();
            // return res.sendStatus(200);
            const AllPosts = await Post.find();
            sendEventsToAll(AllPosts)

        } else {
            console.log('User couldnt be found');
            return res.sendStatus(404)
        }
    } catch(error){
        console.log(error);
        res.sendStatus(400)
    }
}

export const fetchPosts = async(req,res) => {
    const posts = await Post.find();
    res.json({posts: posts})
}

export const createReply = async(req,res) => {
    const {user, postID, message} = req.body
    const post = await Post.findById(postID)
    const userName = post.userName
    const postAuthor = await User.findOne({userName})
    const reply = {
        userName: user,
        body: message
    }
    if (post)
    {
        post.replies.push(reply)
        await post.save();
        for(let i = 0; i < postAuthor.posts.length; i++)
        {
            if(postAuthor.posts[i]._id == postID)
            {
                postAuthor.posts[i].replies.push(reply);
                await postAuthor.save();
                break;
            }
        }
        const AllPosts = await Post.find();
        sendEventsToAll(AllPosts)
        // return res.sendStatus(200);
    } else {
        console.log('Post couldn\'t be found');
        return res.sendStatus(404)
    }
}

