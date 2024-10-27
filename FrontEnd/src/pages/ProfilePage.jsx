import React from "react";
import './ProfilePage.css';
import NavBar from "../components/NavBar";
import ProfileInfo from "../components/ProfileInfo";
const ProfilePage = ({userName, CompletedClassArr, RemoveProfileClass, EnrolledClassArr, TutoringClassesArr, AddTutorClass, RemoveTutorClass, toggleEditClasses, setToggleEditClasses}) => {

return(
    <>
    <div className="ProfilePageMasterContainer">
        <div className="NavBarContainer">
            <NavBar userName={userName}/>
        </div>
        <div className="ProfileContainer">
            <ProfileInfo userName = {userName} CompletedClassArr = {CompletedClassArr} RemoveProfileClass={RemoveProfileClass} EnrolledClassArr={EnrolledClassArr} TutoringClassesArr = {TutoringClassesArr} AddTutorClass={AddTutorClass} RemoveTutorClass = {RemoveTutorClass} toggleEditClasses = {toggleEditClasses} setToggleEditClasses = {setToggleEditClasses}/>
        </div>
    </div>  
    </>
);
};

export default ProfilePage;