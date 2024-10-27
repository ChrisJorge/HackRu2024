import React from "react";
import OBCompletedClasses from "../components/OBCompletedClasses";
import OBEnrolledClasses from "../components/OBEnrolledClasses";
import OBConfirm from "../components/OBConfirm";

const OnboardPage = ({CompletedClassArr, UpdateCompletedClasses, RemoveCompletedClass, Notification, ChangeOBForm, UpdateEnrolledClasses, EnrolledClassArr, RemoveEnrolledClass, ChangeOnBoardForm, UploadCompletedAndEnrolledClasses}) => {

    return (ChangeOnBoardForm == 1 ? <OBCompletedClasses CompletedClassArr = {CompletedClassArr} UpdateCompletedClasses = {UpdateCompletedClasses} RemoveCompletedClass = {RemoveCompletedClass} Notification={Notification} ChangeOBForm={ChangeOBForm}/>
        : ChangeOnBoardForm == 2 ?  <OBEnrolledClasses  UpdateEnrolledClasses = {UpdateEnrolledClasses} Notification = {Notification} EnrolledClassArr = {EnrolledClassArr} RemoveEnrolledClass = {RemoveEnrolledClass} ChangeOBForm={ChangeOBForm}/> 
        : <OBConfirm ChangeOBForm = {ChangeOBForm} CompletedClassArr = {CompletedClassArr} EnrolledClassArr = {EnrolledClassArr} Notification = {Notification} RemoveCompletedClass = {RemoveCompletedClass} RemoveEnrolledClass = {RemoveEnrolledClass} UploadCompletedAndEnrolledClasses = {UploadCompletedAndEnrolledClasses}/>) 
};
export default OnboardPage;