import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Login from './components/Login/Login.js';
import useToken from './components/App/useToken';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from './containers/Calendar';
import DataForm from './containers/DataForm';



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
    <>
      <nav>
        <Link to="/">Calendar </Link>
        <Link to="/update">Update</Link>
      </nav>
      <Routes>
        <Route index element={< CalendarPage />} />
        <Route path="/update" element={<DataForm />} />
      </Routes>
    </>
  );
}

export default App;
