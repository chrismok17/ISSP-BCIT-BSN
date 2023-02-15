
export default function FormRow ({ formNumber, forms, setForms }) {

  function handleUpdateForm (field, value) {
    const newForms = [...forms]
    newForms[formNumber] = {...newForms[formNumber], [field]: value }
    setForms(newForms)
  }

  return (
    <form className="data-form">
      <div className="data-form__inputs">
        <div>
          <label htmlFor="date">date</label>
          <input
            name="date"
            type="date"
            value={forms[formNumber].date}
            onChange={(e) => handleUpdateForm('date', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="start-time">start time</label>
          <input
            name="start-time"
            type="time"
            value={forms[formNumber]['start-time']}
            onChange={(e) => handleUpdateForm('start-time', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="end-time">end time</label>
          <input
            name="end-time"
            type="time"
            value={forms[formNumber]['end-time']}
            onChange={(e) => handleUpdateForm('end-time', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="facilitator">facilitator</label>
          <input
            name="facilitator"
            type="text"
            value={forms[formNumber].facilitator}
            onChange={(e) => handleUpdateForm('facilitator', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stat">stat</label>
          <input
            name="stat"
            type="checkbox"
            value={forms[formNumber].stat}
            onChange={(e) => handleUpdateForm('stat', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="room-number">room number</label>
          <input
            name="room-number"
            type="text"
            value={forms[formNumber]['room-number']}
            onChange={(e) => handleUpdateForm('room-number', e.target.value)}
          />
        </div>
      </div>
    </form>
  )
}
