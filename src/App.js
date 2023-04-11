import { React, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Table from "./components/Table";
import "./App.css";

function App() {
  const CREATE_OBITUARY_URL = "";
  const GET_OBITUARIES_URL = "";

  const [overlay, setOverlay] = useState(false);
  const [obituaries, setObituaries] = useState([]);

  const toggleObituaryOverlay = () => {
    setOverlay(!overlay);
  };

  const getObituaries = () => {
    // fetch()
    // setObituaries()
  };

  // useEffect(() => {
  //   getObituaries();
  // }, []);

  const addObituary = (obituary) => {
    const formData = new FormData();
    formData.append("id", obituary.id);
    formData.append("file", obituary.file);
    formData.append("name", obituary.name);
    formData.append("born", obituary.born);
    formData.append("died", obituary.died);

    fetch(CREATE_OBITUARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          getObituaries();
          toggleObituaryOverlay();
        }
      })
      .catch((error) => {
        console.log(error);
        toggleObituaryOverlay();
      });
  };

  return (
    <div className="container">
      <div className={!overlay ? "box" : "box box-disabled"}>
        <Navbar toggleObituaryOverlay={toggleObituaryOverlay} />
        <Table obituaries={obituaries} />
      </div>
      <div className="box overlay">
        {overlay ? (
          <Overlay
            addObituary={addObituary}
            toggleObituaryOverlay={toggleObituaryOverlay}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
