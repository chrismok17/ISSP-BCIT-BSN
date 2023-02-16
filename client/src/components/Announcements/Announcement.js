import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Announcements.css";

const Announcement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const date = new Date()
  // const formattedDate = date.toLocaleString("en-US", {timeZone: "America/Los_Angeles", hour12: false}).replace(/[/]/g, "-");
  // const datetime = formattedDate.replace(",", "");
  const handleSubmit = async (e) => {
    // Added 'e' parameter so that i can use e.preventDefault() since before I was getting page reload errors when trying to use fetch, this helps prevent it
    e.preventDefault();
    return await fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Right now I have an alert to pop up if the status code from the /login endpoint is recieved
        // I get "no bueno" no matter what so it's a compare credentials issue i assume
        if (data.message === "Success") {
          alert("Success");
        } else {
          alert("no bueno");
        }
      })
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="announcement-wrapper">
        <h1>Announcements</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <label>
            <p>Title</p>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            <p>Description</p>
            <textarea
              id="description"
              type="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="submit-button">
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Announcement;
