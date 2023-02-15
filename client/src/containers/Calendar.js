import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PopUp from '../components/PopUp';
import CalendarDay from '../components/CalendarDay';
import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from '../context';
import { dummyData } from '../dummydata';

export default function CalendarPage() {
  const Context = useContext(GlobalContext);
  const [value, onChange] = useState(new Date())
  const [ filteredSheetData, setFilteredSheetData ] = useState([])
  const matchedDates = useRef({})

  useEffect(() => {
    if (dummyData.length > 0) {
      setFilteredSheetData(dummyData.filter((openLab) => {
        return new Date(openLab.date).getMonth() === value.getMonth()
      }))
    }
    // eslint-disable-next-line
  }, [dummyData])

  return (
    <div className="App">
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={(date, event) => {
          console.log("date, event", date, event)
          console.log("matched dates", matchedDates)
          const selectedDay = matchedDates.current[date.toISOString()]
          if (selectedDay) {
            Context.setPopup(!Context.state.popupOpen)
            Context.setSelectedDay(selectedDay)
          }
        }}
        tileContent={({ date, view }) =>{
          let matchingDay = []
          if (filteredSheetData.length > 0 && date.getMonth() === value.getMonth()) {
            matchingDay = filteredSheetData.filter((openLab) => {
              return date.getDate() === new Date(openLab.date).getDate()
            })
            if (matchingDay.length > 0) {
              matchedDates.current = {
                ...matchedDates.current,
                [date.toISOString()]: matchingDay
              }
            }

          }
          return <CalendarDay date={date} data={matchingDay} />
        }}
      />
      <PopUp />
    </div>
  )
}
