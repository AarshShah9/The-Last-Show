import React from "react";
import "../components/Overlay.css";

import { useState } from "react";

function Overlay() {
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");
  const [born, setBorn] = useState(null);
  const [died, setDied] = useState(null);

  return (
    <form className="form">
      <p className="x-out">&#10006;</p>
      <div className="main-form-container">
        <h2>Create a New Obituary</h2>
        <img src="ripicon.png" alt="flower" className="flower-image"></img>
        <div>
          <label for="file-upload" className="file-upload-label">
            Select an image for the deceased&nbsp;
            {fileName ? "(" + fileName + ")" : null}
          </label>
          <input
            type="file"
            id="file-upload"
            name="filename"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setFileName(e.target.files[0].name);
            }}
          />
        </div>

        <input
          className="name-input-box"
          type="text"
          placeholder="Name of the deceased"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="dates">
          <label for="born-date-input">
            <i>Born:</i>
          </label>
          <input className="born-date-input" type="datetime-local" />
          <label for="died-date-input">
            <i>Died:</i>
          </label>
          <input className="died-date-input" type="datetime-local" />
        </div>

        <input type="submit" value="Write Obituary" className="form-submit" />
      </div>
    </form>
  );
}

export default Overlay;
