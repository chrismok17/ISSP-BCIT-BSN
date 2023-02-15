// import logo from './logo.svg';
// import { ReactComponentElement as ReactLogo } from './logo.svg';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import PopUp from './components/PopUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/home.js';
import Login from './components/Login/Login.js';
// import Login from "./..client/../login";
import useToken from './components/App/useToken';

function App() {
  const { token, setToken } = useToken();
  const [value, onChange] = useState(new Date())
  const [ popUpOpen, setPopUpOpen] = useState(false)

  useEffect(() => {
    console.log('token changed', token)
  }, [token])
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
