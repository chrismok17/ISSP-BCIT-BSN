export function updateCalendar (forms) {
  return fetch("http://localhost:8080/updateCalendar", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({forms})
  })
}
