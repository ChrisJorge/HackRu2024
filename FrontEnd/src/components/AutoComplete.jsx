import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './AutoComplete.css';

const AutoComplete = ({UsersArr, setMessageScreen, setUserBeingMessaged, fetchConversation}) => {
    const changeMessageScreen = (value) => {
        const data = value;
        console.log(data)
        setMessageScreen(1);
        setUserBeingMessaged(data);
        fetchConversation(data.id);
    }
    return(
        <div className='AutoCompleteMasterContainer'>
                <Autocomplete
                    disablePortal
                    options={!UsersArr ? [{label:"Loading...", id:0}] : UsersArr }
                    sx={{ width: 800,
                    backgroundColor: '#f0f0f0',  // change the background color of the component
                    '& .MuiAutocomplete-inputRoot': {
                      backgroundColor: '#e0e0e0', // change the background color of the input field
                    },
                    '& .MuiAutocomplete-paper': {
                      backgroundColor: '#ffffff', // change the background color of the dropdown options
                    }}}
                    onChange={(event, value) => changeMessageScreen(value)}
                    renderInput={(params) => <TextField {...params} label="User" />}
                /> 
        </div>
    )
}


export default AutoComplete;