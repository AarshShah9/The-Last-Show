import React from "react";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Table from "./components/Table";
import "./App.css";

function App() {
  const [overlay, setOverlay] = React.useState(false);
  const [obituaries, setObituaries] = React.useState([]);

  const toggleObituaryOverlay = () => {
    setOverlay(!overlay);
  };

  const getObituaries = () => {
    // fetch()
    // setObituaries()
  };

  const addObituary = (obituary) => {
    // fetch()
    // setObituaries()
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
