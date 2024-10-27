import React from "react";
import './MessageTab.css';
import IndividualMessage from "./IndividualMessage";
const MessageTab = ({userBeingMessaged, user, setMessageScreen, messageArr, createConversation}) => {
    const getMessage = (event) => {
        event.preventDefault();
        const data = {message}
        createConversation(data.message.value)
    }

    const exitMessage = () => {
        setMessageScreen(0)
    }

    console.log(messageArr)
    return(<>
    <div className="MessageTabPlacementContainer">
        <div className="MessageTabMasterContainer">
            <div className="MessageTabHeaderContainer">
                <p className="MessageHeader">Messages with {userBeingMessaged}</p>
                <button className="ExitBTN" onClick={exitMessage}>X</button>
            </div>
            <div className="MessageTabMessagesContainer">
                {messageArr.length > 0 ? messageArr.map((message, i) => {return(<IndividualMessage user = {user} userSendingMessage = {message.UserName} message={message.message} key={i}/>)}) : (<div className="txtDark"> No messages with this person yet </div>)}
                {/* {messageArr.length > 0 ? messageArr.map((message, i) => {console.log(message)}): <div className="txtDark"> No messages with this person yet </div>} */}
            </div>
            <div className="MessageTabSendMessageContainer">
                    <form className="FormContainer" onSubmit={getMessage}>
                        <input type="text" placeholder="Enter message" id='message'className="MessageTabInput" />
                        <button className="SendMessageBTN" type="submit">Send</button>
                    </form>
            </div>
        </div>
    </div>
    </>)
}


export default MessageTab