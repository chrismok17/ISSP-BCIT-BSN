import React, { useContext, useState } from "react";
import "./popup.css"
import { GlobalContext } from "../context";
import { updateCalendar } from "../utils/fetchFunctions";
import FormRow from './FormRow'

export default function PopUp () {
  const context = useContext(GlobalContext)

  const [editFormVisible, setEditFormVisible] = useState(false)
  const [formState, setFormState] = useState(context.state.selectedDay)

  function handleFinishEditing () {
    console.log('no more editing', formState)
    updateCalendar(formState)
    setEditFormVisible(false)
  }

  function handleClose () {
    setEditFormVisible(false)
    context.setPopup(false)
  }

  if (context.state.popupOpen) {
    return (
      <div className="popup">
        <button onClick={handleClose}>close</button>
        {context.state.selectedDay.map((data, i) => (
          <div key={i}>
            <div>Facilitator: {data.facilitator}</div>
            <div>Start-time: {data['start-time']}</div>
            <div>End-time: {data['end-time']}</div>
            <div>Room Number: {data['room-number']}</div>
          </div>
        ))}
        {context.state.isAdmin && !editFormVisible && (
          <button onClick={() => setEditFormVisible(true)}>edit</button>
        )}
        {editFormVisible && (
          <>
            <FormRow
              setForms={setFormState}
              forms={formState.length > 0 ? formState : context.state.selectedDay}
              formNumber={0}
            />
            <button onClick={handleFinishEditing}>finish editing</button>
          </>
        )}
      </div>
    )
  }
  return <></>

}
