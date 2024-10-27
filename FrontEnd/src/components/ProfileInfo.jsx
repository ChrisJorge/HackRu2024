import React from "react";
import './ProfileInfo.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Class from '../components/Class.jsx'
const ProfileInfo = ({userName, CompletedClassArr, RemoveProfileClass, EnrolledClassArr, TutoringClassesArr, AddTutorClass, RemoveTutorClass, toggleEditClasses}) => {

    const noFormUp = () => {
        return(<div className="ProfileInfoMasterContainer">
            <div className="ProfileInfoPicture">
                <AccountCircleIcon fontSize="inherit"/>
            </div> 
            <div className="ProfileUserName">
                    {userName}
            </div>
            <div className="ClassesMasterContainer">
                <div className="FlexRowContainer">
                    <div className="ClassTitle">
                        <p>Enrolled Classes</p>
                    </div>
                    <div className="ProfileEditBTNContainer">
                        <button className="ProfileEnrolledClassesBTN">Edit</button>
                    </div>
                </div>
                <div className="ClassesBox">
                    {EnrolledClassArr.length > 0 ? EnrolledClassArr.map((EnrolledClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {EnrolledClass.courseNum} Name={EnrolledClass.courseName} Grade={EnrolledClass.grade} RemoveClass={RemoveProfileClass} DBID={EnrolledClass._id}/></div>)}) : <div>You Do Not Have Any Enrolled Classes!</div>}
                </div>
                <div className="ClassTitle">
                    <p>Completed Classes</p> 
                </div>
                <div className="ClassesBox"> 
                    {CompletedClassArr.length > 0 ? CompletedClassArr.map((CompletedClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {CompletedClass.courseNum} Name={CompletedClass.courseName} Grade={CompletedClass.grade}  RemoveClass={RemoveProfileClass} DBID = {CompletedClass._id} Tutoring = {CompletedClass.tutoring} AddTutorClass = {AddTutorClass} Code={1}/></div>)}) : <div>You Do Not Have Any Completed Classes!</div>}
                </div>
                <div className="ClassTitle">
                    <p>Classes You Are Tutoring</p>
                </div>
                <div className="ClassesBox">
                {TutoringClassesArr.length > 0 ? TutoringClassesArr.map((TutorClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {TutorClass.courseNum} Name={TutorClass.courseName} Grade={TutorClass.grade}  RemoveClass={RemoveProfileClass} DBID = {TutorClass._id} Tutoring = {TutorClass.tutoring} RemoveTutorClass = {RemoveTutorClass}/></div>)}) : <div>You are not tutoring any classes!</div>}
                </div>
            </div>
        </div>)
    }

    const editFormUp = () => {
        return(<div className="ProfileInfoMasterContainer">
            <div className="ProfileInfoPicture">
                <AccountCircleIcon fontSize="inherit"/>
            </div> 
            <div className="ProfileUserName">
                    {userName}
            </div>
            <div className="ClassesMasterContainer">
                <div className="FlexRowContainer">
                    <div className="ClassTitle">
                        <p>Enrolled Classes</p>
                    </div>
                    <div className="ProfileEditBTNContainer">
                        <button className="ProfileEnrolledClassesBTN">Edit</button>
                    </div>
                </div>
                <div className="ClassesBox">
                    {EnrolledClassArr.length > 0 ? EnrolledClassArr.map((EnrolledClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {EnrolledClass.courseNum} Name={EnrolledClass.courseName} Grade={EnrolledClass.grade} RemoveClass={RemoveProfileClass} DBID={EnrolledClass._id}/></div>)}) : <div>You Do Not Have Any Enrolled Classes!</div>}
                </div>
                <div className="ClassTitle">
                    <p>Completed Classes</p> 
                </div>
                <div className="ClassesBox"> 
                    {CompletedClassArr.length > 0 ? CompletedClassArr.map((CompletedClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {CompletedClass.courseNum} Name={CompletedClass.courseName} Grade={CompletedClass.grade}  RemoveClass={RemoveProfileClass} DBID = {CompletedClass._id} Tutoring = {CompletedClass.tutoring} AddTutorClass = {AddTutorClass} Code={1}/></div>)}) : <div>You Do Not Have Any Completed Classes!</div>}
                </div>
                <div className="ClassTitle">
                    <p>Classes You Are Tutoring</p>
                </div>
                <div className="ClassesBox">
                {TutoringClassesArr.length > 0 ? TutoringClassesArr.map((TutorClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {TutorClass.courseNum} Name={TutorClass.courseName} Grade={TutorClass.grade}  RemoveClass={RemoveProfileClass} DBID = {TutorClass._id} Tutoring = {TutorClass.tutoring} RemoveTutorClass = {RemoveTutorClass}/></div>)}) : <div>You are not tutoring any classes!</div>}
                </div>
            </div>
        </div>)
    }

return(editFormUp())
};

export default ProfileInfo;