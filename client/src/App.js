// import logo from './logo.svg';
// import { ReactComponentElement as ReactLogo } from './logo.svg';
import { useEffect, useContext } from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import Login from './components/Login/Login.js';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from './containers/Calendar';
import DataForm from './containers/DataForm';
import SurveyPage from './containers/SurveyPage';
import { GlobalContext } from './context';


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
