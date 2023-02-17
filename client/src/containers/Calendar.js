import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PopUp from '../components/PopUp';
import CalendarDay from '../components/CalendarDay';
import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from '../context';


export default function CalendarPage() {
  const Context = useContext(GlobalContext);
  const [month, setMonth] = useState(new Date())
  const [ filteredSheetData, setFilteredSheetData ] = useState([])
  const matchedDates = useRef({})

  async function fetchData() {
    const response = await fetch("http://localhost:8080/getMonth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({month: month.getMonth() + 1})
    }).then((results) => {
      if (results.status === 200) {
        return results.json()
      }
    })
    console.log("what is response", response)
    setFilteredSheetData(response.results)
  }
  useEffect(() => {
    // calendar month button is buggy. this prevents it from being used
    const calendarMonthLabel = document.querySelector('.react-calendar__navigation button.react-calendar__navigation__label')
    calendarMonthLabel.setAttribute('tabindex', -1)
    calendarMonthLabel.style.pointerEvents = 'none'
    fetchData()
  }, [])

  // useEffect(() => {
  //   if (dummyData.length > 0) {
  //     setFilteredSheetData(dummyData.filter((openLab) => {
  //       return new Date(openLab.date).getUTCMonth() === month.getMonth()
  //     }))
  //   }
  //   // eslint-disable-next-line
  // }, [dummyData, month])

  function handleActiveStartDateChange ({ activeStartDate }) {
    setMonth(activeStartDate)
  }

  return (
    <div className="App">
      <Calendar
        onActiveStartDateChange={handleActiveStartDateChange}
        value={month}
        onClickDay={(date, event) => {
          const selectedDay = matchedDates.current[date.toISOString()]
          if (selectedDay) {
            Context.setPopup(!Context.state.popupOpen)
            Context.setSelectedDay(selectedDay)
          }
        }}
        showNeighboringMonth={false}
        tileDisabled={({ activeStartDate, date, view }) => {
          return date.getDay() === 0 || date.getDay() === 6
        }}
        tileContent={({ date, view }) => {
          let matchingDay = []
          console.log("filtered sheet data", filteredSheetData)
          if (filteredSheetData && filteredSheetData.length > 0 && date.getMonth() === month.getMonth()) {
            matchingDay = filteredSheetData.filter((openLab) => {
              return date.getDate() === new Date(openLab.date).getUTCDate()
            })
            if (matchingDay.length > 0) {
              // store matched dates for the month in an object to make looking up a clicked day faster
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
