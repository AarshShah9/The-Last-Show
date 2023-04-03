import React from "react";
import "../components/Navbar.css";

function Navbar(props) {
  return (
    <nav>
      <div className="spacer"></div>

      <div className="title">
        <h1>The Last Show</h1>
      </div>

      <div className="wrapper">
        <div className="add-obituary">+ New Obituary</div>
      </div>
    </nav>
  );
}

export default Navbar;
