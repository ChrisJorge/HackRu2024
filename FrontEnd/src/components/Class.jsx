import React from "react";
import './Class.css'
import DeleteIcon from '@mui/icons-material/Delete';
const Class = ({ID, Name, Grade, Index, RemoveClass, DBID, Tutoring, AddTutorClass, Code, RemoveTutorClass}) => {
    const getIndex = () => {
        RemoveClass(Index);
    };

    const fetchDataBaseIDForDelete = () => {
        RemoveClass(DBID)
    }

    const fetchDataBaseIDForTutorAdd = () => {
        AddTutorClass(DBID)
    }

    const fetchDataBaseIDForTutorRemoval = () => {
        RemoveTutorClass(DBID)
    }

    return(DBID && (Grade == 'A' || Grade == 'A-' || Grade == 'B+' || Grade == 'B') && Tutoring == false && Code == 1?  
    <div className="ProfileCompletedClassOuterContainer">
        <div className="ProfileCompletedClassMasterContainer">
            <p className="ClassId">{ID}</p><p className="ClassName">{Name}</p><p className="Divider">|</p><p className="ClassGrade">{Grade}</p>
            <div className="Delete">
                <button className="DeleteBTN" onClick={fetchDataBaseIDForDelete}><DeleteIcon /></button>
            </div>
        </div>
        <div className="TutorBTNContainer">
        <button className="TutorBTN" onClick={fetchDataBaseIDForTutorAdd} >Tutor</button>
        </div>
    </div> :
    (DBID && Grade == 'IN PROGRESS') || (DBID && (Grade == 'A' || Grade == 'A-' || Grade == 'B+' || Grade == 'B') && Tutoring == true && Code == 1)?    
    <div className="ClassOuterContainer">
        <div className="ClassMasterContainer">
            <p className="ClassId">{ID}</p><p className="ClassName">{Name}</p><p className="Divider">|</p><p className="ClassGrade">{Grade}</p>
            <div className="Delete">
                <button className="DeleteBTN" onClick={fetchDataBaseIDForDelete}><DeleteIcon /></button>
            </div>
        </div>
    </div> :  
    DBID && (Grade == 'A' || Grade == 'A-' || Grade == 'B+' || Grade == 'B') && Tutoring == true ? 
    <div className="ProfileCompletedClassOuterContainer">
    <div className="ProfileCompletedClassMasterContainer">
        <p className="ClassId">{ID}</p><p className="ClassName">{Name}</p><p className="Divider">|</p><p className="ClassGrade">{Grade}</p>
    </div>
    <div className="TutorBTNContainer">
    <button className="TutorBTN" onClick={fetchDataBaseIDForTutorRemoval} >Remove Tutoring</button>
    </div>
</div>
    :
    DBID ? 
    <div className="ClassOuterContainer">
        <div className="ClassMasterContainer">
            <p className="ClassId">{ID}</p><p className="ClassName">{Name}</p><p className="Divider">|</p><p className="ClassGrade">{Grade}</p>
            <div className="Delete">
                <button className="DeleteBTN" onClick={fetchDataBaseIDForDelete}><DeleteIcon /></button>
            </div>
        </div>
    </div> 
    :
    <div className="ClassMasterContainer">
        <p className="ClassId">{ID}</p><p className="ClassName">{Name}</p><p className="Divider">|</p><p className="ClassGrade">{Grade}</p>
         <div className="Delete">
             <button className="DeleteBTN" onClick={getIndex}><DeleteIcon /></button>
         </div>      
    </div>)
    
    // return(
    //     <>
    //    <div className="ClassMasterContainer">
    //         <p className="ClassId">{ID}</p><p className="ClassName">{Name}</p><p className="Divider">|</p><p className="ClassGrade">{Grade}</p>
    //         <div className="Delete">
    //             <button className="DeleteBTN" onClick={getIndex}><DeleteIcon /></button>
    //         </div>
    //    </div>
    //     </>
    // )
    // return(
    //     <>
    //         <div className="ClassOuterContainer">
    //             <div className="ClassMasterContainer">
    //                 <p className="ClassId">{ID}</p><p className="ClassName">{Name}</p><p className="Divider">|</p><p className="ClassGrade">{Grade}</p>
    //                 <div className="Delete">
    //                     <button className="DeleteBTN" onClick={fetchDataBaseID}><DeleteIcon /></button>
    //                 </div>
    //             </div>
    //             <div className="TutorBTNContainer">
    //             <button className="TutorBTN" onClick={fetchDataBaseID} disabled={false}>Tutor</button>
    //             </div>
    //         </div>
    //     </>
    // )
}


export default Class;