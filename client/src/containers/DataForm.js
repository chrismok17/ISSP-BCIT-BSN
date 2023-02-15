import { useState } from "react";
import FormRow from '../components/FormRow'
import "./data-form.css"

const defaultState = {
  date: '',
  'start-time': '',
  'end-time': '',
  facilitator: '',
  stat: false,
  'room-number': ''
}

export default function DataForm () {
  const [numberOfRows, setNumberOfRows] = useState(1)
  const [forms, setForms] = useState([{ ...defaultState }])

  function handleSubmit() {
    console.log('HANDLE SUBMIT', forms)
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
