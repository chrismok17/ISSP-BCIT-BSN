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
export default function Login({ setToken }) {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    // Added 'e' parameter so that i can use e.preventDefault() since before I was getting page reload errors when trying to use fetch, this helps prevent it
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // credentials: 'same-origin',
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => {
        if (response.status === 200) {
          console.log('response is 200')
          return response.json()
        } else {
          throw new Error('error when submitting data', { cause: response })
        }
      })
      .then(data => {
        setToken(data.token)
        console.log('what is data', data)
      })
      .catch((err) => {
        console.error('handleSubmit', err)
      })
   }

  return(
    <>
      <div className="login-wrapper">
        <h1>SIGN IN </h1>
          <form className="form" onSubmit={handleSubmit}>
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