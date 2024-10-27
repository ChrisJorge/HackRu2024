import React from "react";
import NavBar from "../components/NavBar";
import './FeedPage.css'
import Posts from "../components/Posts";
import CreateIcon from '@mui/icons-material/Create';
import PostForm from "../components/PostForm";
import { useEffect } from "react";
const FeedPage = ({Usersname, CreatePost, TogglePostForm, setTogglePostForm, fetchPosts, PostsArr, CreateReply, setPosts}) => {

    
    // useEffect(() => {
    //    fetchPosts()
    //   }, [TogglePostForm])

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/events');
    
        eventSource.onmessage = (event) => {
          const updatedData = JSON.parse(event.data);
          let updatedPosts = []
          for(let i = 0; i < updatedData.length; i++)
          {
            updatedPosts.push(updatedData[i]);
          }
         updatedPosts.reverse()
         updatedPosts.length > 0 ? setPosts(updatedPosts) : fetchPosts() // Update the data on receiving an event
        };
        return () => {
          eventSource.close(); // Close the connection when component unmounts
        };
      }, []);

    const changePostState = () => {
        setTogglePostForm(!TogglePostForm);
    }

    return(TogglePostForm ?  
        <div className="FeedPageMasterContainer">
        <div className="NavBarContainer">
            <NavBar userName = {Usersname}/>
        </div>
        <div className="FeedPostsContainer">
        {PostsArr.length > 0 ? PostsArr.map((post, i) => {return <Posts user = {Usersname} postID = {post._id} postersName={post.userName} Title = {post.title} Body = {post.body} Replies = {post.replies} key={i} CreateReply = {CreateReply} Index = {i}/>}) : <div>Posts Loading</div>}
        </div>
            <PostForm CreatePost = {CreatePost} changePostState = {changePostState}/>
       </div> : 
     <div className="FeedPageMasterContainer">
        <div className="NavBarContainer">
            <NavBar userName = {Usersname}/>
        </div>
        <div className="FeedPostsContainer">
        {PostsArr.length > 0 ? PostsArr.map((post, i) => {return (<Posts user = {Usersname} postID = {post._id} postersName={post.userName} Title = {post.title} Body = {post.body} Replies = {post.replies} CreateReply = {CreateReply} key={i} Index = {i}/>)}) : <div>Posts Loading</div>}
        </div>
        <div className="CreatePostContainer">
            <div className="CreatePostBTNContainer">
                <button className="CreatePostBTN" onClick={changePostState}><CreateIcon style={{fontSize: '3.5rem'}}/></button>
            </div>
        </div>
    </div>
 )
    // return(
    //     <>
        // <div className="FeedPageMasterContainer">
        //     <div className="NavBarContainer">
        //         <NavBar />
        //     </div>
        //     <div className="FeedPostsContainer">
        //         <Posts userName = {'Test Account'} Title = {'Birds in the trap sing mcknight'} Body = {'I get those goosebumps every time yeah, you come around yeah, you ease my mind you make everything feel fine I get those goosebumps every time yeah, you come around yeah, you ease my mind you make everything feel fine I get those goosebumps every time yeah, you come around yeah, you ease my mind you make everything feel fine'} Replies = {[]}/>
        //     </div>
        //     <div className="CreatePostContainer">
        //         <div className="CreatePostBTNContainer">
        //             <button className="CreatePostBTN"><CreateIcon style={{fontSize: '3.5rem'}}/></button>
        //         </div>
        //     </div>
        //     <PostForm CreatePost = {CreatePost}/>
        // </div>
    //     </>
    // )
}

export default FeedPage;