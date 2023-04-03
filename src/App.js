import React from "react";
import Navbar from "./components/Navbar";
import Overlay from "./components/Overlay";
import Table from "./components/Table";
import "./App.css";

function App() {
  const [overlay, setOverlay] = React.useState(false);

  const toggleObituaryOverlay = () => {
    setOverlay(!overlay);
  };

  return (
    <div class="container">
      <div class="box">
        <Navbar toggleObituaryOverlay={toggleObituaryOverlay} />
        <Table />
      </div>
      <div class="box overlay">
        {overlay ? (
          <Overlay toggleObituaryOverlay={toggleObituaryOverlay} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
