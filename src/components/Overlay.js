import React from "react";
import "../components/Overlay.css";

import { useState } from "react";

function Overlay({ toggleObituaryOverlay }) {
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");
  const [born, setBorn] = useState("");
  const [died, setDied] = useState("");

  return (
    console.log("born: " + born),
    (
      <form className="form">
        <p className="x-out" onClick={toggleObituaryOverlay}>
          &#10006;
        </p>
        <div className="main-form-container">
          <h2>Create a New Obituary</h2>
          <img src="ripicon.png" alt="flower" className="flower-image"></img>
          <div>
            <label HtmlFor="file-upload" className="file-upload-label">
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
            required
          />
          <div className="dates">
            <label for="born-date-input">
              <i>Born:</i>
            </label>
            <input
              className="born-date-input"
              type="datetime-local"
              value={born}
              onChange={(e) => {
                setBorn(e.target.value);
              }}
            />
            <label for="died-date-input">
              <i>Died:</i>
            </label>
            <input
              className="died-date-input"
              type="datetime-local"
              value={died}
              onChange={(e) => {
                setDied(e.target.value);
              }}
            />
          </div>

          <input
            type="submit"
            value="Write Obituary"
            className="form-submit"
          />
        </div>
      </form>
    )
  );
}

export default Overlay;
