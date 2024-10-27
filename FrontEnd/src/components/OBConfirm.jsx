import React from "react";
import './OBConfirm.css';
import Class from "./Class";
const OBConfirm = ({ChangeOBForm, CompletedClassArr, EnrolledClassArr, RemoveCompletedClass, RemoveEnrolledClass, Notification, UploadCompletedAndEnrolledClasses}) => {

    const EditCompleted = () => {
        ChangeOBForm('1');
    }
    const EditEnrolled = () => {
        ChangeOBForm('2');
    }
    return(
        <>
       <div className="OnboardMasterContainer">
            <div className="NotificationContainer">
               {Notification}
            </div>
            <div className="OnboardFormMasterContainer">
               <div className="Title">
                <h1>Confirm Enrolled And Completed Classes</h1>
               </div>
               <div className="LabelContainer">
                    <label htmlFor="CompletedClasses" className="OnBoardLabel">Completed Classes</label>
                    <button className="OnBoardEditBTN" onClick={EditCompleted} >Edit</button>
               </div>
               <div className="ClassesBox">
                    {CompletedClassArr.length > 0 ? CompletedClassArr.map((CompletedClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {CompletedClass.courseNum} Name={CompletedClass.courseName} Grade={CompletedClass.grade} Index = {i} RemoveClass={RemoveCompletedClass}/></div>)}) : <div>You Do Not Have Any Completed Classes!</div>}
                </div>
                <div className="LabelContainer">
                    <label htmlFor="CompletedClasses" className="OnBoardLabel">Enrolled Classes</label>
                    <button className="OnBoardEditBTN" onClick={EditEnrolled} >Edit</button>
               </div>
                <div className="ClassesBox">
                    {EnrolledClassArr.length > 0 ? EnrolledClassArr.map((EnrolledClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {EnrolledClass.courseNum} Name={EnrolledClass.courseName} Grade={EnrolledClass.grade} Index = {i} RemoveClass={RemoveEnrolledClass}/></div>)}) : <div>You Do Not Have Any Enrolled Classes!</div>}
                </div>
                <button className="OnBoardBTN" onClick={UploadCompletedAndEnrolledClasses}>Confirm</button>
            </div>
        </div>
        </>
    )
}

export default OBConfirm