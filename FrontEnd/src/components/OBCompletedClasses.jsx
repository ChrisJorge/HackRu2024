import React from "react";
import Class from "./Class";
import './OBCompletedClasses.css';

const OBCompletedClasses = ({CompletedClassArr, UpdateCompletedClasses, RemoveCompletedClass, Notification, ChangeOBForm}) => {
    const MoveToNextForm = () => {
        ChangeOBForm('+1');
    }
    return(
        <>
        <div className="OnboardMasterContainer">
            <div className="NotificationContainer">
                {Notification}
            </div>
            <div className="OnboardFormMasterContainer">
                <div className="Title">
                    <h1>Classes Completed</h1>
                </div>
                <form id= "OnboardForm" onSubmit={UpdateCompletedClasses}>
                    <label htmlFor="ClassID" className="OnBoardLabel">Class ID</label>
                    <input type="text" id="ClassID" placeholder="XX-###" maxLength={18} className="OnBoardInput"/>
                    <label htmlFor="ClassName" className="OnBoardLabel">Class Name</label>
                    <input type="text" id="ClassName" placeholder="Class Name" maxLength={40} className="OnBoardInput"/>
                    <label htmlFor="Grade" className="OnBoardLabel">Grade</label>
                    <select name="Grade" id="Grade" className="OnBoardInput">
                        <option value="" selected >Choose here</option>
                        <option value = "A">A</option>
                        <option value = "A-">A-</option>
                        <option value = "B+">B+</option>
                        <option value = "B">B</option>
                        <option value = "B-">B-</option>
                        <option value = "C+">C+</option>
                        <option value = "C">C</option>
                        <option value = "C-">C-</option>
                        <option value = "D+">D+</option>
                        <option value = "D">D</option>
                        <option value = "D-">D-</option>
                        <option value = "F">F</option>
                    </select>
                    <button className="OnBoardBTN" type="submit">Add Class</button>
                </form>
               <div className="ClassesBox">
                {CompletedClassArr ? CompletedClassArr.map((CompletedClass, i) => {return(<div className="ClassContainer" key={i}><Class ID = {CompletedClass.courseNum} Name={CompletedClass.courseName} Grade={CompletedClass.grade} Index = {i} RemoveClass={RemoveCompletedClass} DBID={null}/></div>)}) : <div></div>}
               </div>
               <button className="OnBoardBTN" onClick={MoveToNextForm}>Continue</button>
            </div>
        </div>
        </>
    );
};


export default OBCompletedClasses;