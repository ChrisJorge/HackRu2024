import React from "react";
import Signin from "../components/Signin";
import SignUp from "../components/SignUp";
const WelcomePage = ({changeForm, SignInForm, createAccount, Notification, signIn}) => {
    
    return (SignInForm ? <Signin changeForm={changeForm} signIn = {signIn} Notification = {Notification} /> : <SignUp changeForm={changeForm} createAccount = {createAccount} Notification = {Notification}/>);

};

export default WelcomePage;