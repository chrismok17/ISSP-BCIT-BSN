import { useState } from "react";
import FormRow from '../components/FormRow'
import "./data-form.css"

const defaultState = {
  date: '',
  'start-time': '',
  'end-time': '',
  facilitator: '',
  stat: 0,
  'room-number': ''
}

export default function DataForm () {
  const [numberOfRows, setNumberOfRows] = useState(1)
  const [forms, setForms] = useState([{ ...defaultState }])

  async function handleSubmit() {
    const response = await fetch("http://localhost:8080/updateCalendar", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({forms})
    })
    console.log('HANDLE SUBMIT', forms, response)

    //CLEAR FORMS
    setForms([{...defaultState}])
    setNumberOfRows(1)
  }

  function handleAddRow () {
    setForms([...forms, { ...defaultState }])
    setNumberOfRows(numberOfRows + 1)
  }


  return (
    <>
      {Array.from(Array(numberOfRows).keys()).map((_, i) => (
        <FormRow
          setForms={setForms}
          forms={forms}
          formNumber={i}
          key={i}
        />
      ))}
      <button onClick={handleAddRow}>+</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
