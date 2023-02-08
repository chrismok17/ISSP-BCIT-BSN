import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

// Previous code

// async function loginUser(credentials) {
//  return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }

// Moved fetch request to inside the Login(). This sends the username and password as json to localhost:8080/login to get authenticated
export default function Login() {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    // Added 'e' parameter so that i can use e.preventDefault() since before I was getting page reload errors when trying to use fetch, this helps prevent it
    e.preventDefault();
    return await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
      .then(response => response.json())
      .then(data => {
        // Right now I have an alert to pop up if the status code from the /login endpoint is recieved
        // I get "no bueno" no matter what so it's a compare credentials issue i assume
        if (data.status === 200 || data.status === 204) {
          alert("Success")
        } else {
          alert("no bueno")
        }
      })
      .then((err) => {
        console.log(err)
      })
   }

  // Previous code
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     email,
  //     password
  //   });
  //   console.log(email, password)
  //   setToken(token);
  // }

  return(
    <>
      <div className="login-wrapper">
        <h1>SIGN IN </h1>
          <form className="form" onSubmit={e => handleSubmit(e)}>
            <label>
              <p>Email</p>
              <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div className="submit-button">
              <button type="submit">SIGN IN</button>
            </div>
          </form>
      </div>
    </>
    
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};