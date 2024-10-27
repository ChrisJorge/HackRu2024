import React from "react";

import './Signup.css';


const SignUp = ({changeForm, createAccount, Notification}) => {
    return(
        <>
         <div className="signUpMasterContainer">
            <div className="NotificationContainer">
                {Notification}
            </div>
            <div className="signUpFormContainer">
                <div className="FormTitle">
                    <h1>Sign Up</h1>
                </div>
                <div className="FormBody">
                    <form onSubmit={createAccount}> 
                    <label className = "SignUpLabel" htmlFor = "Name">Name</label><br/>
                        <div className="InputContainer">
                            <input className="SignUpInput" type="text" id="Name" placeholder="First Name Last Name" maxLength={60}/><br/>
                        </div>
                        <label className = "SignUpLabel" htmlFor = "Email">School Email</label><br/>
                        <div className="InputContainer">
                            <input className="SignUpInput" type="text" id="Email" placeholder="Your@email.edu" maxLength={60}/><br/>
                        </div>
                        <label className="SignUpLabel" htmlFor="Year">Class Year</label><br/>
                        <select name="Year" id="Year" className="OnBoardInput">
                        <option value="" selected >Choose here</option>
                        <option value = "Freshman">Freshman</option>
                        <option value = "Sophomore">Sophomore</option>
                        <option value = "Junior">Junior</option>
                        <option value = "Senior">Senior</option>
                        <option value = "Masters">Masters</option>
                        <option value = "Doctorate">Doctorate</option>
                    </select>
                        <label className = "SignUpLabel" htmlFor = "Password">Password</label><br/>
                        <div className="InputContainer">
                            <input className="SignUpInput" type="password" id="Password" placeholder="••••••" maxLength={30}/>
                        </div>
                        <button className="SignInButton" type="submit">Create Account</button>
                        <p className="SignInText">Already have an account? <button className="SignUpBtn" onClick={changeForm}>Sign In</button></p>
                    </form>
                    <hr></hr>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignUp;