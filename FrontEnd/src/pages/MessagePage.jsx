import React from "react";
import NavBar from "../components/NavBar";
import AutoComplete from "../components/AutoComplete";
import MessageTab from "../components/MessageTab";
import { useEffect } from "react";

const MessagePage = ({fetchAllUsers, UsersArr, MessageScreen, setMessageScreen, userBeingMessaged, setUserBeingMessaged, Usersname, fetchConversation, messageArr, createConversation}) => {
        useEffect(() => {
      fetchAllUsers()
      }, [])

    // return(
    //     <>
    //     <div className="MessagePageMasterContainer">
    //         <div className="NavBarMessagePageMasterContainer">
    //             <NavBar />
    //         </div>
    //         <div className="MessagePageSearchBarContainer">
    //            <AutoComplete UsersArr = {UsersArr} SetMessageScreen = {SetMessageScreen}/>
    //         </div>
    //     </div>
    //     </>
    // )
    return(MessageScreen == 0 ?  <div className="MessagePageMasterContainer">
        <div className="NavBarMessagePageMasterContainer">
            <NavBar userName = {Usersname}/>
        </div>
        <div className="MessagePageSearchBarContainer">
           <AutoComplete UsersArr = {UsersArr} setMessageScreen = {setMessageScreen} setUserBeingMessaged = {setUserBeingMessaged} fetchConversation = {fetchConversation}/>
        </div>
    </div> :  <div className="MessagePageMasterContainer">
            <div className="NavBarMessagePageMasterContainer">
                <NavBar userName = {Usersname}/>
            </div>
            <div className="MessageTabMessagePageContainer">
                <MessageTab userBeingMessaged={userBeingMessaged.label} user={Usersname} setMessageScreen = {setMessageScreen} messageArr = {messageArr} createConversation = {createConversation}/>
            </div>
            
        </div>)

    // return(<MessageTab userBeingMessaged={'example'} user={'cjorge1'}/>)

}



export default MessagePage