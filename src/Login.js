import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function Login({setIsLoggedIn, setAuthToken, setUsername, username, URLBase}){

    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
    }

    function validateForm(){
        return username.length > 0 && password.length > 0;
    }

    function post() {
        const req = {username: username, password: password};
        const url = URLBase+'api/api-token-auth/';
        axios.post(url, req).then(response => {console.log(response.data.token); setAuthToken(response.data.token); setIsLoggedIn(true)}).catch(response => {setLoginError(true)});
    }

    return(
        <div>
            <h1>{"Welcome to the shittiest login page on the planet"}</h1>
            <hr />
            {loginError ? (<span>Login Error, check your username and password</span>):(<span></span>)}
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control autoFocus type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button block size="lg" type="submit" disable={!validateForm()} onClick={post}>Submit</Button>
            </Form>
        </div>
    )
    /*
    return(
        <div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" type="text" placeholder="Username"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="******************"/>
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button">
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                       href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )*/


}

export default Login;