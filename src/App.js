import logo from './logo.svg';
import './App.css';
import Login from './Login';
import UserInfo from './UserInfo';
import QC from './QC'
import React, {useState} from "react";

function App(){

    const [authToken, setAuthToken] = useState("");
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const URLBase = "http://192.168.1.219:8000/";

  return (
      <div className="flex items-center justify-center h-screen">

        {!isLoggedIn ? (
        <Login URLBase = {URLBase} setIsLoggedIn={setIsLoggedIn} setAuthToken={setAuthToken} setUsername={setUsername} username={username}/>
        ) : <UserInfo authToken={authToken} URLBase = {URLBase} username={username}/>
        }


      </div>
  );
}

export default App;
