import { useEffect, useContext } from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import Login from './components/Login/Login.js';
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from './containers/Calendar';
import DataForm from './containers/DataForm';
import SurveyPage from './containers/SurveyPage';
import Home from './containers/home'
import { GlobalContext } from './context';
import DropdownAnnouncement from './components/Announcement/announcement.js';


function App() {
  const { state: { userData: { token } } } = useContext(GlobalContext)

  useEffect(() => {
    console.log('token changed', token)
  }, [token])

  if (!token) {
    return <Login />
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/calendar">Calendar </Link>
        <Link to="/update">Update</Link>
        <Link to="/survey">Survey</Link>
        <DropdownAnnouncement />
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/update" element={<DataForm />} />
      </Routes>
    </>
  );
}

export default App;
