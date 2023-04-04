import React from "react";
import "../components/Navbar.css";

function Navbar({ toggleObituaryOverlay }) {
  return (
    <nav>
      <div className="spacer"></div>

      <div className="title">
        <h1>The Last Show</h1>
      </div>

      <div className="wrapper">
        <div className="add-obituary" onClick={toggleObituaryOverlay}>
          + New Obituary
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
