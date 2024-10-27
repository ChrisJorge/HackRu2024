import React from "react";
import './IndividualMessage.css';

const IndividualMessage = ({user, userSendingMessage, message}) => {
    return(
        <>
        <div className="IndividualMessageMasterContainer">
            <div className="IndividualMessageActualMessageContainer">
                <p className="IndividualMessageActualMessage">{userSendingMessage}: {message}</p>
            </div>
            
        </div>
        </>
    )
//    return( user == userSendingMessage ?  
//     <div className="IndividualMessageMasterContainerRight"> 
//         <div className="IndividualMessageContainerRight">
//             <p className="IndividualMessageActualMessage">{userSendingMessage}: {message}</p>
//         </div>   
//     </div> :  
//     <div className="IndividualMessageMasterContainer">
//         <div className="IndividualMessageContainer">
//             <p className="IndividualMessageActualMessage">{userSendingMessage}: {message}</p>
//         </div> 
//     </div>
//    )
}


export default IndividualMessage