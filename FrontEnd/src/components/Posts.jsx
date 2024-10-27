import React from "react";
import './Posts.css'
import PostReply from "./PostReply";
import SendIcon from '@mui/icons-material/Send';
const Posts = ({user, postersName, postID, Title, Body, Replies, CreateReply, Index}) => {
    const getDataForPostReply = (event) => {
        event.preventDefault();
        const data = {ReplyMessage}
        CreateReply(user, postID, data.ReplyMessage[Index].value, Index)
    }
    return(
        <>
        <div className="PostsMasterContainer">
            <div className="PostContainer">
                <div className="PostCreatedBy">
                    <p>{postersName} posted</p>
                </div>
                <div className="PostTitle">
                    {Title}
                </div>
                <div className="PostBody">
                    {Body}
                </div>
                <div className="Spacer"></div>
                <div className="PostReplyFormContainer">
                    <form className="PostReplyForm" id="PostReplyForm" onSubmit={getDataForPostReply} >
                        <input type="text" id="ReplyMessage" placeholder="Enter Reply here" maxLength={300} className="PostInput2"/>     
                        <button className="ReplyBTN" type="submit"><SendIcon /></button>
                    </form>
                </div>
                <div className="PostReplyContainer">
                {Replies.length > 0 ? Replies.map((reply, i) => {return <PostReply userName = {reply.userName} Body = {reply.body} key={i}/> }): <div></div>}
                </div>
            </div>    
        </div>
        </>
    )
}

export default Posts;

