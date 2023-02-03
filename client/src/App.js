import logo from "./logo.svg";
import { useState } from "react";
import Calendar from "react-calendar";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import PopUp from "./components/PopUp";

function App() {
  const [value, onChange] = useState(new Date());
  const [popUpOpen, setPopUpOpen] = useState(false);

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
    </div>
  );
}

export default App;
