// import logo from './logo.svg';
// import { ReactComponentElement as ReactLogo } from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import Login from './components/Login/Login.js';
import useToken from './components/App/useToken';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from './containers/Calendar';
import DataForm from './containers/DataForm';
import SurveyPage from './containers/SurveyPage';


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
    <>
      <nav>
        <Link to="/">Calendar </Link>
        <Link to="/update">Update</Link>
        <Link to="/survey">Survey</Link>
      </nav>
      <Routes>
        <Route index element={< CalendarPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/update" element={<DataForm />} />
      </Routes>
    </>
  );
}

export default App;
