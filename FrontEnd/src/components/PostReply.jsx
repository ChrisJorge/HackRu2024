import React from "react";
import './PostReply.css';

const PostReply = ({userName, Body}) => {
    return(
    <>
    <div className="PostReplyMasterContainer">
       <p className="PostReplyUserName">{userName}:</p>
       <p className="PostReplyBody">{Body}</p>
    </div>
    </>)
};

export default PostReply;