import React, { useContext }from "react";
import "./popup.css"
import { GlobalContext } from "../context";

export default function PopUp () {
  const context = useContext(GlobalContext)
  if (context.state.popupOpen) {
    return (
      <div className="popup">
        <button onClick={() => context.setPopup(false)}>close</button>
        {context.state.selectedDay.map((data, i) => (
          <div key={i}>
            <div>Facilitator: {data.facilitator}</div>
            <div>Start-time: {data['start-time']}</div>
            <div>End-time: {data['end-time']}</div>
            <div>Room Number: {data['room-number']}</div>
          </div>
        ))}
      </div>
    )
  }
  return <></>

}
