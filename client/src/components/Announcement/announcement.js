import React, { useState, useEffect } from "react";
import '../../App.css';

const DropdownAnnouncement = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/announcement')
      .then(response => response.json())
      .then(data => {
        setAnnouncements(data);
      });
  }, []);

  return (
    <div className="announcement-container">
      <img
        src="./logo192.png" // replace this to new image
        onClick={() => setShowDropdown(!showDropdown)}
        alt="Announcement"
        style={{ width: 24, height: 24 }} // temporary style, need to style this in css
      />
      {showDropdown && (
        <div className="dropdown-announcement-container">
          <div className="dropdown-announcement">
            {announcements.map(announcement => (
                <div key={announcement.id}>
                <p>{announcement.title}</p>
                <p>{announcement.description}</p>
                <p>{announcement.date}</p>
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownAnnouncement;