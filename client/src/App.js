// import logo from './logo.svg';
// import { ReactComponentElement as ReactLogo } from './logo.svg';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import PopUp from './components/PopUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/home.js';
import Login from './components/Login/Login.js';
// import Login from "./..client/../login";
import useToken from './components/App/useToken';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken(){
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token

// }

function App() {
  const { token, setToken } = useToken();
  const [value, onChange] = useState(new Date())
  const [ popUpOpen, setPopUpOpen] = useState(false)
  // const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={(value, event) => {
          console.log("clicked.", value, event);
          setPopUpOpen(!popUpOpen);
        }}
      />
      {popUpOpen && <PopUp />}
    </div>,
    
    <div className="wrapper">
    <h1>Application</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/home">
          <Home />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);
}

export default App;
