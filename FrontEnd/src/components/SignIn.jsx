// Import the necessary libraries and pages
import React from "react"; // Import the REACT library
import './SignIn.css'; // Import this components style sheet
const Signin = ({changeForm, signIn, Notification}) => { // The function that acts as the Signin form component
    return(
        <>
        <div className="signInMasterContainer">
            <div className="NotificationContainer">
                {Notification}
            </div>
            <div className="signInFormContainer">
                <div className="FormTitle">
                    <h1>Sign In</h1>
                </div>
                <div className="FormBody">
                    <form onSubmit={signIn}> 
                        <label className = "SignInLabel" htmlFor = "Email">School Email</label><br/>
                        <div className="InputContainer">
                            <input className="SignInInput" type="text" id="Email" placeholder="Your@email.edu" maxLength={60}/><br/>
                        </div>
                        <label className = "SignInLabel" htmlFor = "Password">Password</label><br/>
                        <div className="InputContainer">
                            <input className="SignInInput" type="password" id="Password" placeholder="••••••" maxLength={30}/>
                        </div>
                        <button className="SignInButton">Sign In</button>
                        <p className="SignInText">Don't have an account? <button className="SignUpBtn" onClick={changeForm}>Sign Up</button></p>
                    </form>
                    <hr></hr>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signin;