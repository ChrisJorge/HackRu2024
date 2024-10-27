// Import libraries
import { useState } from 'react'; // Allows states to be added to functional components
import axios from "axios"; // Used to make requests 
import Alert from '@mui/material/Alert'; // For the Alert component
import { Route, Routes, Navigate} from 'react-router-dom';  // For naviagating different url routes
// Import pages
import WelcomePage from './pages/Welcomepage'; // Imports the WelcomePage 
import OnboardPage from './pages/Onboardpage'; // Imports the Onboard page
import FeedPage from './pages/FeedPage'; // Import the FeedPage
import ProfilePage from './pages/ProfilePage'; // Imports the profile page
import MessagePage  from './pages/MessagePage'; // Imports the Message page

function App() {
  const [SignInform, setForm] = useState(true); // Sets the SignInform to a state of true and defines the method to update the forms state
  const [User, setUser] = useState(null)
  const [ChangeOnBoardForm, SetChangeOnBoardForm] = useState(1); 
  const [Notification, setNotification] = useState(null); // Set the Notification state to null and define the method to update its state
  const [CompletedClassArr, setCompletedClassArr] = useState([]);
  const [CompletedClassHashMap, setCompletedClassHashMap] = useState({});
  const [EnrolledClassArr, setEnrolledClassArr] = useState([]);
  const [EnrolledClassHashMap, setEnrolledClassHashMap] = useState({});
  const [TutoringClassesArr, setTutoringClassesArr] = useState([]);
  const [TogglePostForm, setTogglePostForm] = useState(false);
  const [PostsArr, setPosts] = useState([]);
  const [toggleEditClasses, setToggleEditClasses] = useState(1);
  const [UsersArr, setUsersArr] = useState([]);
  const [MessageScreen, setMessageScreen] = useState(0);
  const [userBeingMessaged, setUserBeingMessaged] = useState(null);
  const [messageArr, setMessageArr] = useState([])

  const changeForm = () => { //Changes the SignInForm state conditionally rendering either the SignIn or SignUp Form
      setForm(!SignInform); //Changes the state triggering a re render
      setNotification(null)
  };

  const ChangeOBForm = (code) => {
    switch(code)
    {
      case '+1':
        setNotification(null);
        SetChangeOnBoardForm(ChangeOnBoardForm + 1);
        break;
      case '-1':
        setNotification(null);
        SetChangeOnBoardForm(ChangeOnBoardForm - 1);
        break;
      case '1':
        setNotification(null);
        SetChangeOnBoardForm(1);
        break;
      case '2':
        setNotification(null);
        SetChangeOnBoardForm(2);
        break;
      
    }
  }

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

  const FetchUserData = async(email) => {
    try{
      const response = await axios.get(`http://localhost:3000/login/${email}`);
      setUser(response.data.user)
      filterClasses(response.data.user)
      fetchPosts()
    } catch (error)
    {
      console.log(error)
      setNotification(<Alert severity='error'>An Error occured retrieving your profile, please try again. If error persists contact the creator</Alert>);
    }
  }

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

  const RemoveCompletedClass = (Index) => {
    let NewArr = [...CompletedClassArr]; //Declare a new variable for the array (Necessary to trigger a use state rerender)
    let temp = NewArr.splice(Index,1); //Remove the specified index
    let map = CompletedClassHashMap;
    delete map[temp[0].courseNum];
    setCompletedClassHashMap(map);
    setCompletedClassArr(NewArr); //Modify the TakenClassArr state
    setNotification(<Alert severity="success">Class Successfully Removed</Alert>)
  }

  const UpdateCompletedClasses = (event) => {
    event.preventDefault();
    const data = {ClassID, ClassName, Grade}; //Take the data from the onboard form 
    const C = { //Destructure the data into an object
        courseName: data.ClassName.value.toUpperCase(),
        courseNum: data.ClassID.value.toUpperCase(),
        grade: data.Grade.value,
        inProgress: false,
        tutoring: false
    };
    if(C.courseNum.length == 0 || C.courseName.length == 0 || C.grade.length == 0)
    {
      setNotification(<Alert severity="error">Please Fill In All Fields</Alert>);
    }
    else if(C.courseNum[0] == ' ' || C.courseNum[C.courseNum.length - 1] == ' ' || C.courseName[0] == ' ' || C.courseName[C.courseName.length - 1] == ' ')
    {
      setNotification(<Alert severity="error">Remove any leading or trailing spaces</Alert>)
    }
    else{
      if(CompletedClassHashMap[C.courseNum] !== undefined)
        {
          setNotification(<Alert severity="error">A class with that ID has already been added!</Alert>);
        }
      else if(EnrolledClassHashMap[C.courseNum] !== undefined)
      {
        setNotification(<Alert severity='error'> A class with that ID has already been added to Enrolled Classes!</Alert>)
      }
        else{
          document.querySelectorAll('#OnboardForm')[0].reset()
          let map = CompletedClassHashMap
          map[C.courseNum] = 1
          let Temp = CompletedClassArr;
          setCompletedClassHashMap(map)
          setCompletedClassArr([...Temp, C]); // Modify the TakenClassArr state to reflect the new array
          setNotification(<Alert severity='success'>Class Added</Alert>)
        };
    }
  };

  const UpdateEnrolledClasses = (event) => {
    event.preventDefault();
    const Data ={ClassID, ClassName}
    const C = {
      courseName: Data.ClassName.value.toUpperCase(),
      courseNum: Data.ClassID.value.toUpperCase(),
      grade: 'IN PROGRESS',
      inProgress: true,
      tutoring: false
    }

    if(C.courseNum.length == 0 || C.courseName.length == 0)
      {
        setNotification(<Alert severity="error">Please Fill In All Fields</Alert>);
      }
      else if(C.courseNum[0] == ' ' || C.courseNum[C.courseNum.length - 1] == ' ' || C.courseName[0] == ' ' || C.courseName[C.courseName.length - 1] == ' ')
      {
        setNotification(<Alert severity="error">Remove any leading or trailing spaces</Alert>)
      }
      else
      {
        if(EnrolledClassHashMap[C.courseNum] !== undefined)
          {
            setNotification(<Alert severity="error">A class with that ID has already been added!</Alert>);
          }
        else if(CompletedClassHashMap[C.courseNum] !== undefined)
        {
          setNotification(<Alert severity="error">A class with that ID has already been added to completed classes!</Alert>);
        }
          else{
            document.querySelectorAll('#OnboardForm')[0].reset()
            let map = EnrolledClassHashMap;
            map[C.courseNum] = 1;
            let Temp = EnrolledClassArr;
            setEnrolledClassArr([...Temp, C])
            setEnrolledClassHashMap(map)
            setNotification(<Alert severity="success">Class Added!</Alert>);
          }
      }
  };

  const RemoveEnrolledClass = (Index) => {
    let NewArr = [...EnrolledClassArr]; //Declare a new variable for the array (Necessary to trigger a use state rerender)
    let temp = NewArr.splice(Index,1); //Remove the specified index
    let map = EnrolledClassHashMap;
    delete map[temp[0].courseNum];
    setEnrolledClassHashMap(map);
    setEnrolledClassArr(NewArr); //Modify the TakenClassArr state
    setNotification(<Alert severity="success">Class Successfully Removed</Alert>)
  }

  const UploadCompletedAndEnrolledClasses = async (event) => {
    event.preventDefault();
    if (EnrolledClassArr.length > 0)
    {
      const data = {
        user: User,
        CompletedClassArr: CompletedClassArr,
        EnrolledClassArr: EnrolledClassArr
      };
      try
      {
        const response = await axios.post('http://localhost:3000/uploadClasses', data);
         if(response.data === "OK")
         {
          FetchUserData(User.email)
         }
      }catch(error)
      {
        <Alert severity='error'>An Error occured adding the classes to your profile, please try again. If error persists contact the creator</Alert>
      }
    }
    else{
      setNotification(<Alert severity='error'>You must have atleast one enrolled class to continue</Alert>);
    };
      
  };

  const filterClasses = (user) => {
    let CompletedClasses = []
    let CompletedMap = {}
    let EnrolledClasses = []
    let EnrolledMap = {}
    let Tutoring = []
    for(let i = 0; i < user.classes.length || 0; i++)
    {
        switch(user.classes[i].grade)
        {
            case 'A':
                CompletedClasses.push(user.classes[i]);
                CompletedMap[user.classes[i].courseNum] = 1;
                break;
            case 'A-':
              CompletedClasses.push(user.classes[i]);
              CompletedMap[user.classes[i].courseNum] = 1;
                break;
            case 'B+':
              CompletedClasses.push(user.classes[i]);
              CompletedMap[user.classes[i].courseNum] = 1;
                break;
            case 'B':
                CompletedClasses.push(user.classes[i]);
                CompletedMap[user.classes[i].courseNum] = 1;
                  break;
            case 'IN PROGRESS':
                EnrolledClasses.push(user.classes[i]);
                EnrolledMap[user.classes[i].courseNum] = 1;
                break;
            default:
              CompletedClasses.push(user.classes[i]);
              CompletedMap[user.classes[i].courseNum] = 1;
        };

        if(user.classes[i].tutoring == true)
        {
          Tutoring.push(user.classes[i]);
        }

    };
    setCompletedClassArr(CompletedClasses);
    setEnrolledClassArr(EnrolledClasses);
    setCompletedClassHashMap(CompletedMap);
    setEnrolledClassHashMap(EnrolledMap);
    setTutoringClassesArr(Tutoring)
  }

  const RemoveProfileClass = async (DBID) => {
    console.log(`${DBID}`)
    try{
      const response = await axios.delete(`http://localhost:3000/profile/${User._id}/${DBID}`)
      console.log(response)
      if(response.data === "OK")
      {
        setNotification(<Alert severity="success">Class Removed!</Alert>);
        FetchUserData(User.email)
      }
    } catch (error)
    {
      setNotification(<Alert severity="error">An error occured, please try again!</Alert>);
      console.log(error)
    }
  }

  const AddTutorClass = async(DBID) => {
    try{
      const response = await axios.patch(`http://localhost:3000/profile/${User._id}/${DBID}/true`)
      if(response.data === "OK")
        {
          setNotification(<Alert severity="success">Class Added to tutoring!</Alert>);
          FetchUserData(User.email)
        }
    }catch(error)
    {
      setNotification(<Alert severity="error">An error occured, please try again!</Alert>);
      console.log(error);
    }
  }

  const RemoveTutorClass = async(DBID) => {
    try{
      const response = await axios.patch(`http://localhost:3000/profile/${User._id}/${DBID}/false`)
      if(response.data === "OK")
        {
          setNotification(<Alert severity="success">Class removed from tutoring!</Alert>);
          FetchUserData(User.email)
        }
    }catch(error)
    {
      setNotification(<Alert severity="error">An error occured, please try again!</Alert>);
      console.log(error);
    }
  }

  const CreatePost = async () => {
    const data = {PostTitle, PostBody}
    const post = {
      UserID: User._id,
      PostTitle: data.PostTitle.value,
      PostBody: data.PostBody.value, 
    }
    try{
      console.log('making the post')
      const response = await axios.post('http://localhost:3000/feed/posts', post);
      console.log(response.data);
      if(response.data === "OK")
      {
        document.querySelectorAll('#PostForm')[0].reset()
        setTogglePostForm(!TogglePostForm)
        // fetchPosts()
      }
    } catch(error)
    {
      console.log(error);
    }
  }
  
  const fetchPosts = async () => {
    // try{
    //   let sse = new EventSource('http://localhost:3000/feed/posts');
    //   sse.onmessage = (event) => {
    //     console.log('Opening SSE eventsource')
    //     const updatedData = JSON.parse(event.data);
    //     setPosts(updatedData.posts.reverse())
    //     console.log('new post data retrived and added to state')
    //     sse.close();
    //     console.log('Closing SSE eventSource')
    //   }
    // } catch(error)
    // {
    //   console.log(error)
    // }
    try{
      const response = await axios.get('http://localhost:3000/feed/posts');
      setPosts(response.data.posts.reverse())
    } catch(error){
      console.log(error);
    }
  } 

  const CreateReply = async (user, postID, message, Index) => {
   console.log(user, postID, message, Index)
   const data = {
    user: user,
    postID: postID,
    message: message
   }
   try{
    document.querySelectorAll('#PostReplyForm')[Index].reset()
    const response = await axios.post('http://localhost:3000/feed/posts/reply', data);
   } catch (error){
    console.log(error)
   }
  }

  const fetchAllUsers = async() => {
    try{
      const response = await axios.get('http://localhost:3000/users')
      console.log(response.data.users)
      let tempArray = []
      if(response.data.users)
      {
        for(let i = 0; i < response.data.users.length; i++)
        {
          let obj = {
            label: response.data.users[i].userName,
            id: response.data.users[i]._id,
          }
          tempArray.push(obj)
        }
      }
      if(tempArray.length > 0)
      {
        setUsersArr(tempArray)
      }
      
    } catch(error)
    {
      console.log(error);
    }
  }

  const fetchConversation = async(id) => {
    // const data = {
    //   userMessagingID: User._id,
    //   userBeingMessagedID: userBeingMessaged.id
    // }

    try{
      const response = await axios.get(`http://localhost:3000/messages/${User._id}/${id}`)
      console.log(response.data)
      if(response.data)
      {
        setMessageArr(response.data.messageList)
      }
      else{
        setMessageArr([])
      }
      
    } catch(error){
      console.log('this is an error')
      console.log(error)
    }
  }

  const createConversation = async(msg) => {
    const data = {
      message: msg,
      userMessaging: User._id,
      userBeingMessaged: userBeingMessaged.id
    }
    try{
      const response = await axios.post('http://localhost:3000/messages', data)
      console.log(response.data)
      if(response.data === "OK")
      {
        fetchConversation()
      }
    } catch(error)
    {
      console.log(error)
    }
  }

  const notSignedIn = () => {
    return(
      <Routes>
      <Route path="/" element={<Navigate to="/authenticate"/>}/>
      <Route path="/authenticate" element={<WelcomePage changeForm={changeForm} SignInForm = {SignInform} createAccount={createAccount} Notification={Notification} signIn = {signIn}/>} />
      <Route path='*' element={<Navigate to="/authenticate"/>} />
    </Routes>
    )
    
  }

  const notOnboarded = () => {
    return(
      <Routes>
       <Route path="/authenticate" element={<Navigate to="/onBoard"/>}/>
       <Route path='/onBoard'  element={<OnboardPage CompletedClassArr = {CompletedClassArr} UpdateCompletedClasses = {UpdateCompletedClasses} RemoveCompletedClass = {RemoveCompletedClass} Notification = {Notification} ChangeOBForm = {ChangeOBForm} UpdateEnrolledClasses = {UpdateEnrolledClasses} EnrolledClassArr = {EnrolledClassArr} RemoveEnrolledClass = {RemoveEnrolledClass} ChangeOnBoardForm = {ChangeOnBoardForm} UploadCompletedAndEnrolledClasses = {UploadCompletedAndEnrolledClasses}/> }/>
       <Route path='*' element={<Navigate to="/authenticate"/>} />
    </Routes>
    )
    
  }

  const SignedInAndOnboarded = () => {
    return(
    <Routes>
      <Route path='/authenticate' element={<Navigate to={`/profile/${User.userName}`}/>} />
      <Route path='/onBoard' element={<Navigate to={`/profile/${User.userName}`}/>} />
      <Route path={`/profile/${User.userName}`} element={<ProfilePage userName = {User.userName} CompletedClassArr = {CompletedClassArr} RemoveProfileClass = {RemoveProfileClass} EnrolledClassArr = {EnrolledClassArr} TutoringClassesArr = {TutoringClassesArr} AddTutorClass = {AddTutorClass} RemoveTutorClass = {RemoveTutorClass} toggleEditClasses = {toggleEditClasses} setToggleEditClasses = {setToggleEditClasses}/> }/>
      <Route path={'/feed'} element={<FeedPage Usersname = {User.userName} CreatePost={CreatePost} TogglePostForm = {TogglePostForm} setTogglePostForm = {setTogglePostForm} fetchPosts = {fetchPosts} PostsArr={PostsArr} CreateReply = {CreateReply} setPosts = {setPosts}/>} />
      <Route path={'/messages'} element={<MessagePage fetchAllUsers = {fetchAllUsers} UsersArr={UsersArr} MessageScreen = {MessageScreen} setMessageScreen = {setMessageScreen} userBeingMessaged={userBeingMessaged} setUserBeingMessaged = {setUserBeingMessaged} Usersname = {User.userName} fetchConversation={fetchConversation} messageArr = {messageArr} createConversation = {createConversation}/>} />
 </Routes>
    )
  
  }


  return(User == null ? notSignedIn() : User != null && User.onBoarded == false ? notOnboarded() : SignedInAndOnboarded());
  // return(<MessagePage fetchAllUsers = {fetchAllUsers} UsersArr={UsersArr} MessageScreen = {MessageScreen} setMessageScreen = {setMessageScreen}/>)

};

export default App
