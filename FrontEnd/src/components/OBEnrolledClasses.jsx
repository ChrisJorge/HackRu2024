import React from "react";
import './OBEnrolledClasses.css'
import Class from "./Class";
const OBEnrolledClasses = ({UpdateEnrolledClasses, Notification, EnrolledClassArr, RemoveEnrolledClass, ChangeOBForm}) => {
    const nextPage = () => {
        ChangeOBForm('+1');
    };
    const previousPage = () => {
        ChangeOBForm('-1');
    }
    return(
        <>
        <div className="OnboardMasterContainer">
            <div className="NotificationContainer">
               {Notification}
            </div>
            <div className="OnboardFormMasterContainer">
                <div className="Title">
                    <h1>Enrolled Classes</h1>
                </div>
                <form id= "OnboardForm" onSubmit={UpdateEnrolledClasses}>
                    <label htmlFor="ClassID" className="OnBoardLabel">Class ID</label>
                    <input type="text" id="ClassID" placeholder="XX-###" maxLength={18} className="OnBoardInput"/>
                    <label htmlFor="ClassName" className="OnBoardLabel">Class Name</label>
                    <input type="text" id="ClassName" placeholder="Class Name" maxLength={40} className="OnBoardInput"/>
                    <button className="OnBoardBTN" type="submit">Add Class</button>
                </form>
               <div className="ClassesBox">
                {EnrolledClassArr ? EnrolledClassArr.map((EnrolledClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {EnrolledClass.courseNum} Name={EnrolledClass.courseName} Grade={EnrolledClass.grade} Index = {i} RemoveClass={RemoveEnrolledClass}/></div>)}) : <div></div>}
               </div>
               <div className="BTNContainer">
               <button className="OnBoardBTN" onClick={nextPage}>Continue</button>
               <button className="OnBoardBTN" onClick={previousPage}>Back</button>
               </div> 
            </div>
        </div>
        </>
    );
}


export default OBEnrolledClasses;