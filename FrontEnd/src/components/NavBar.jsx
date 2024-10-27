import React from "react";
import './NavBar.css'
import { Link } from "react-router-dom";
const NavBar = ({userName}) => {
    return(
        <>
        <div className="NavBarMasterContainer">
            <div className="NavBarOptionsContainer">
                <div className="NavBarOption">
                    <Link to={'/feed'}>
                    <p className="NavBarText">Feed</p>
                    </Link>
                   
                </div>
            </div>
            <div className="NavBarOptionsContainer">
                <div className="NavBarOption">
                    <Link to={`/profile/${userName}`}>
                        <p className="NavBarText">Profile</p>
                    </Link>
                </div>
            </div>
            <div className="NavBarOptionsContainer">
                <div className="NavBarOption">
                    <Link to={`/messages`}>
                        <p className="NavBarText">Messages</p>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
};

export default NavBar;