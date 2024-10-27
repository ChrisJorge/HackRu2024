import React from "react";
import './PostForm.css';

const PostForm = ({CreatePost, changePostState}) => {
    return(
        <>
        <div className="PostFormMasterPlacementContainer">
            <div className="PostFormMasterContainer">
                <div className="NotificationContainer">
                </div>
                <div className="FormMasterContainer">
                    <div className="Title">
                        <h1>Post</h1>
                    </div>
                    <form id= "PostForm" className="PostForm">
                        <label htmlFor="PostTitle" className="PostLabel">Post Title</label>
                        <input type="text" id="PostTitle" placeholder="Title" maxLength={100} className="PostInput"/>
                        <label htmlFor="PostBody" className="PostLabel">Post Body</label>
                        <textarea rows={6} cols={50} id="PostBody" maxLength={2000} placeholder="Post body"></textarea>
                    </form>
                <div className="BTNContainer">
                <button className="PostBTN" onClick={CreatePost} >Create Post</button>
                <button className="PostBTN" onClick={changePostState}>Exit</button>
                </div> 
                </div>
            </div>
        </div>
            
        </>
    )
};

export default PostForm;