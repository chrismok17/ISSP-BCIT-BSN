import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Announcements.css";

const Announcement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let date = new Date();
  const [count, setCount] = useState(0);
  date.setHours(date.getHours() - 8);
  let datetime = date.toISOString().slice(0, 19).replace("T", " ");
  const counter = (e) => {
    setCount(e.target.value.length);
  };
  const handleSubmit = async (e) => {
    // Added 'e' parameter so that i can use e.preventDefault() since before I was getting page reload errors when trying to use fetch, this helps prevent it
    e.preventDefault();
    return await fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, date: datetime }),
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
        <h1>Create Announcement</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <label>
            <p>Title</p>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            <p>Description</p>
            <p className="count">{`${count}/200 Characters`}</p>
            <textarea
              id="description"
              type="text"
              maxlength="200"
              onChange={counter}
              // onChange={(e) => setDescription(e.target.value)}
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
