import { useState } from "react";

function AddItem(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [brand, setBrand] = useState("");
  props.AddItem({
    title: title,
    description: description,
  });
  setTitle("");
  setDescription("");
  const addItemButtonPressed = async (e) => {
    //takes input values
    //name == title
    //type == description
    //e.preventDefault;
    //manipulate HTTP req/res headders
    return await fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, date }),
    })
      //sends json w/ title/description in proper format
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          alert("Success");
        } else {
          alert("Fail");
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h2>Add an Announcement</h2>
      </div>
      <div className="row">
        <label htmlFor="name-field">Title:</label>
        <input
          id="title-field"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label htmlFor="type-field">Description:</label>
        <input
          id="description-field"
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
      <div className="row mt-3">
        <div className="col-4" />
        <button
          type="button"
          className="col-4 btn btn-primary"
          onClick={addItemButtonPressed}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddItem;
