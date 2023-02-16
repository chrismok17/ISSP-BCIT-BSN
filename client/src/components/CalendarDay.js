import "./calendar-day.css"

export default function CalendarDay ({ date, data }) {

  /*
  day:3
  end time: 0.4791666666666667
  facilitator: "Jasica"
  month: "feb"
  room number: 3020
  start time: 0.3541666666666667
  __rowNum__: 1
  */

  return (
    <div className="calendar-day">
      { data && data.length > 0 ? (
        data.map((openLab, i) => (
          <div className="lab" key={i}>
          </div>
        ))
      ) : (
        <div className="no-lab" />
      )}
    </div>
  )
}
