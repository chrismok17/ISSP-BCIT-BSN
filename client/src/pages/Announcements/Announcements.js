import "./Announcements.css";
// import SearchBar from "./SearchBar";
import { useState } from "react";
import AddItem from "./AddItem";
import ItemsDisplay from "./ItemsDisplay";
import "./index.css";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import styled from "styled-components";

// check if props.color exists, if not, make it a default of black

function Announcements() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
    //take the updateData and pass it as a callback function to the SearchBar
    // in search bar, we can access the callback function and it will update the data to the search parameters
  };
  const addItemToData = (item) => {
    let items = data["items"]; //get list of items we already have from data
    item.id = items.length; //create an ID for each entry, length of the list
    items.push(item); //push item into currentData
    setData({ items: items }); //set setData to new items array
    console.log(data);
  };
  return (
    <div>
      <AddItem AddItem={addItemToData} />
      <ItemsDisplay items={data["items"]} />
    </div>
  );
}

export default Announcements;
