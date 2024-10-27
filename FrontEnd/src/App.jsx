import { useState } from 'react'; // Allows states to be added to functional components
import axios from "axios"; // Used to make requests 
import Alert from '@mui/material/Alert'; // For the Alert component
import { Route, Routes, Navigate} from 'react-router-dom';  // For naviagating different url routes

function App() {
  onst [SignInform, setForm] = useState(true); // Sets the SignInform to a state of true and defines the method to update the forms state
}

const changeForm = () => { //Changes the SignInForm state conditionally rendering either the SignIn or SignUp Form
  setForm(!SignInform); //Changes the state triggering a re render
  setNotification(null)
};

const createAccount = async (event) => 
  {
    event.preventDefault(); //Prevents an elements default behavior
    const account = {Name,Email,Year,Password}; // variable to be an object with all the information gotten from the form
    const data = { //destructure the account data into a data object to be sent with the AXIOS request
      Name: account.Name.value,
      Email: account.Email.value,
      Year: account.Year.value,
      Password: account.Password.value
    };
    if(data.Name.length == 0 || data.Email.length == 0 || data.Year.length == 0 || data.Password.length == 0) // Verify user has input data in all relevant fields
    {
      setNotification(<Alert severity="error">Please submit all fields </Alert>);
    }
    else if(data.Email.includes(' ') || data.Password.includes(' ')) // Checks to ensure no empty spaces are put (not very efficient this way) O(n + m ) 
    {
      setNotification(<Alert severity="error">Please submit Email and Password fields without any spaces </Alert>);
    }
    else if (data.Name[0] == ' ' || data.Name[data.Name.length - 1] == ' ')
    {
      setNotification(<Alert severity="error">Please submit Name without any leading or trailing spaces </Alert>);
    }
    else
    {
      let temp = ''; //Temporary variable that will be used in checking if the entered email is a school email
      for(let i = data.Email.length - 1; i > data.Email.length - 4; i --) // Loop to check and ensure that the user has entered a school email address
      { 
        temp += data.Email[i]; // Add the last 3 characters in the email to the temp variable
      }
      temp = temp.split('').reverse().join(''); // takes the backwords string ('ude') and makes it ('edu')
      if (temp === 'edu' && data.Email.includes("@")) //.includes verifies that the email address contains the @ character
        {
          try{
            const response = await axios.post(`http://localhost:3000/`, data);
            console.log(response.status);
            if(response.data === "OK")
            {
              setNotification(<Alert severity="success">Account successfully created! Please proceed to the login page and login</Alert>);
            }
          } catch(error){
            console.log(error.status)
             if(error.status === 400)
              {
                setNotification(<Alert severity="error">An Account already exists with that email address</Alert>);
              }
              else if (error.status === 401){
                setNotification(<Alert severity="error">An unexpected error has occured please try again and notify creator if error persists</Alert>);
              }
            }
          }
      else
      {
        setNotification(<Alert severity="error">Please enter a valid school email address</Alert>);
      }
    };
  };


  const signIn = async(event) => {
    event.preventDefault();
    const account = {Email, Password};
    const data = {
      email: account.Email.value,
      Password: account.Password.value
    }
    try{
      const response = await axios.post('http://localhost:3000/login', data)
      if(response.status == 200)
      {
        FetchUserData(data.email)
      }
    } catch(error){
      if(error.status === 401)
      {
        setNotification(<Alert severity="error">Email or Password is incorrect</Alert>);
      }
    }
  };
export default App
